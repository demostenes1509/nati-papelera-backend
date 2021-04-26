import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPicture } from '../../models';
import { AuthModule } from '../auth/auth.module';
import { ProductsPicturesController } from './products-pictures.controller';
import { ProductsPicturesService } from './products-pictures.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPicture]), AuthModule],
  controllers: [ProductsPicturesController],
  providers: [ProductsPicturesService],
  exports: [ProductsPicturesService],
})
export class ProductsPicturesModule {}
