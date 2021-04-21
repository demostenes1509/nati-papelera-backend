import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../../models';
import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { PackagingModule } from '../packaging/packaging.module';
import { ProductsModule } from '../products/products.module';
import { MapapelProviderParser } from './parsers/manapel/manapel-provider-parser';
import { AbstractParserProvider } from './parsers/parser-abstract-factory';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Provider]), AuthModule, CategoriesModule, ProductsModule, PackagingModule],
  controllers: [ProvidersController],
  providers: [ProvidersService, AbstractParserProvider, MapapelProviderParser],
})
export class ProvidersModule {}
