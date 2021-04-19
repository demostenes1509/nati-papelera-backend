import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product, Provider } from '../../models';
import { AuthModule } from '../auth/auth.module';
import { MapsaParser } from './parsers/mapsa-parser';
import { AbstractParserProvider } from './parsers/parser-abstract-factory';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, Category, Product]), AuthModule],
  controllers: [ProvidersController],
  providers: [ProvidersService, AbstractParserProvider, MapsaParser],
})
export class ProvidersModule {}
