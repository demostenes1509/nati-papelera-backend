import { Type } from '@nestjs/common';
import { Route, Routes } from 'nest-router';
import { NATI_BACKEND_PATH } from './helpers/constants.helper';
import { AppModule } from './modules/app/app.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { HomeModule } from './modules/home/home.module';
import { MercadoLibreModule } from './modules/mercado-libre/mercado-libre.module';
import { PackagingModule } from './modules/packaging/packaging.module';
import { ProductsPicturesModule } from './modules/products-pictures/products-pictures.module';
import { ProductsModule } from './modules/products/products.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { SideBarModule } from './modules/sidebar/sidebar.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';

export const routes: Routes = [
  {
    path: NATI_BACKEND_PATH,
    children: [
      { module: AppModule, path: '/auth' },
      { module: CategoriesModule, path: '/categories' },
      { module: HealthcheckModule, path: '/healthcheck' },
      { module: HomeModule, path: '/home' },
      { module: MercadoLibreModule, path: '/mercado-libre' },
      { module: SideBarModule, path: '/sidebar' },
      { module: PackagingModule, path: '/packaging' },
      { module: ProductsModule, path: '/products' },
      { module: ProductsPicturesModule, path: '/products-pictures' },
      { module: ProvidersModule, path: '/providers' },
      { module: ConfigurationModule, path: '/configuration'},
    ],
  },
];

export const controllersModules: Array<Type> = (routes[0].children as Route[]).map((c) => c.module as Type);
