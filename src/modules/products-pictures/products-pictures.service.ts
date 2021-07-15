import { HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getProductPicture, uploadProductPicture } from '../../helpers/aws.helper';
import { UploadedFileProps } from '../../interfaces/uploaded-file.interface';
import { Logger } from '../../helpers/logger.helper';
import { ProductPicture } from '../../models';
import { CreatePictureRequestDto } from './dto/create-picture-request.dto';
import { CreatePictureResponseDto } from './dto/create-picture-response.dto';

export class ProductsPicturesService {
  private readonly logger = new Logger(ProductsPicturesService.name);

  @InjectRepository(ProductPicture)
  private readonly productPictureRepository: Repository<ProductPicture>;

  async create(dto: CreatePictureRequestDto, files: Array<UploadedFileProps>): Promise<CreatePictureResponseDto> {
    const withLogo = files.find((f) => f.originalname === 'logo');
    const withoutLogo = files.find((f) => f.originalname !== 'logo');

    const [withLogoKey, withoutLogoKey] = await Promise.all([
      uploadProductPicture(withLogo),
      uploadProductPicture(withoutLogo),
    ]);

    const [pictureLogo, pictureWithoutLogo] = await Promise.all([
      this.productPictureRepository.save({
        id: withLogoKey,
        productId: dto.productId,
        mimeType: withLogo.mimetype,
        withLogo: true,
      }),
      this.productPictureRepository.save({
        id: withoutLogoKey,
        productId: dto.productId,
        mimeType: withoutLogo.mimetype,
        withLogo: false,
      }),
    ]);

    return new CreatePictureResponseDto(pictureLogo);
  }
  async get(response, id: string): Promise<void> {
    const picture = await this.productPictureRepository.findByIds([id]);
    if (!picture) throw new NotFoundException();

    const pictureImage = await getProductPicture(id);

    response.setHeader('Type', 'image');
    response.setHeader('Content-Disposition', 'inline; filename=' + id);
    response.setHeader('Content-Length', pictureImage.ContentLength);
    response.status(HttpStatus.OK).send(pictureImage.Body);
  }
}
