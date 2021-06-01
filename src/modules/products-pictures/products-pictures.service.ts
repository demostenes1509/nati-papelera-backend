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

  async create(dto: CreatePictureRequestDto, file: UploadedFileProps): Promise<CreatePictureResponseDto> {
    this.logger.log('Uploading picture');
    const key = await uploadProductPicture(file);
    const picture = await this.productPictureRepository.save({
      id: key,
      productId: dto.productId,
      mimeType: file.mimetype,
    });
    return new CreatePictureResponseDto(picture);
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
