import { HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getProductPicture, uploadProductPicture } from '../../helpers/aws';
import { UploadedFileProps } from '../../helpers/interfaces';
import { Logger } from '../../helpers/logger';
import { ProductPicture } from '../../models';
import { CreatePictureRequestDto } from './dto/create-picture-request.dto';
import { CreatePictureResponseDto } from './dto/create-picture-response.dto';

function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}

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

    // response.setHeader('Cache-Control', 'must-revalidate,private');
    // response.setHeader('Expires', '-1');
    // response.setHeader('Last-Modified', last_update.toUTCString());
  }
}
