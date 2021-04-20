import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product, Provider } from '../../models';
import { AuthModule } from '../auth/auth.module';
import { MapapelProviderParser } from './parsers/manapel/manapel-provider-parser';
import { AbstractParserProvider } from './parsers/parser-abstract-factory';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, Category, Product]), AuthModule],
  controllers: [ProvidersController],
  providers: [ProvidersService, AbstractParserProvider, MapapelProviderParser],
})
export class ProvidersModule {}
