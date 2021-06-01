import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packaging } from '../../models';
import { AuthModule } from '../auth/auth.module';
import { MercadoLibreModule } from '../mercado-libre/mercado-libre.module';
import { PackagingController } from './packaging.controller';
import { PackagingService } from './packaging.service';

@Module({
  imports: [TypeOrmModule.forFeature([Packaging]), AuthModule, MercadoLibreModule],
  controllers: [PackagingController],
  providers: [PackagingService],
  exports: [PackagingService],
})
export class PackagingModule {}
