import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uploadProductPicture } from '../../helpers/aws';
import { UploadedFileProps } from '../../helpers/interfaces';
import { Logger } from '../../helpers/logger';
import { ProductPicture } from '../../models';
import { CreatePictureRequestDto } from './dto/create-picture-request.dto';
import { CreatePictureResponseDto } from './dto/create-picture-response.dto';

@Injectable()
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
}
