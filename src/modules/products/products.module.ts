import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductPicture } from '../../models';
import { AuthModule } from '../auth/auth.module';
import { MercadoLibreModule } from '../mercado-libre/mercado-libre.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductPicture]), AuthModule, MercadoLibreModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
