import { Routes, Route } from 'nest-router';
import { Type } from '@nestjs/common';
import { NATI_BACKEND_PATH } from './helpers/constants';
import { AppModule } from './modules/app/app.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { HomeModule } from './modules/home/home.module';
import { SideBarModule } from './modules/sidebar/sidebar.module';
import { PackagingModule } from './modules/packaging/packaging.module';
import { ProvidersModule } from './modules/providers/providers.module';

export const routes: Routes = [
  {
    path: NATI_BACKEND_PATH,
    children: [
      { module: AppModule, path: '/auth' },
      { module: CategoriesModule, path: '/categories' },
      { module: HealthcheckModule, path: '/healthcheck' },
      { module: HomeModule, path: '/home' },
      { module: SideBarModule, path: '/sidebar' },
      { module: PackagingModule, path: '/packaging' },
      { module: ProvidersModule, path: '/providers' },
    ],
  },
];

export const controllersModules: Array<Type> = (routes[0].children as Route[]).map((c) => c.module as Type);
