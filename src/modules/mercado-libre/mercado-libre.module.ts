import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercadoLibreCategory } from '../../models';
import { AuthModule } from '../auth/auth.module';
import { MercadoLibreController } from './mercado-libre.controller';
import { MercadoLibreService } from './mercado-libre.service';

@Module({
  imports: [TypeOrmModule.forFeature([MercadoLibreCategory]), AuthModule],
  controllers: [MercadoLibreController],
  providers: [MercadoLibreService],
  exports: [MercadoLibreService],
})
export class MercadoLibreModule {}
