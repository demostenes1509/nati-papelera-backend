import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uploadProductPicture } from '../../helpers/aws';
import { UploadedFileProps } from '../../helpers/interfaces';
import { Logger } from '../../helpers/logger';
import { ProductPicture } from '../../models';
import { AddNewImageRequestDto } from './dto/add-new-image-request.dto';

@Injectable()
export class ProductsPicturesService {
  private readonly logger = new Logger(ProductsPicturesService.name);

  @InjectRepository(ProductPicture)
  private readonly productPictureRepository: Repository<ProductPicture>;

  async create(dto: AddNewImageRequestDto, file: UploadedFileProps): Promise<void> {
    this.logger.log('Uploading picture');
    const key = await uploadProductPicture(file);
    await this.productPictureRepository.save({ id: key, productId: dto.productId, contentType: 'Hola' });
  }
}
