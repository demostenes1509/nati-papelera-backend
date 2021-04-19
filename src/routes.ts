import { Routes, Route } from 'nest-router';
import { Type } from '@nestjs/common';
import { NATI_BACKEND_PATH } from './helpers/constants';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AppModule } from './modules/app/app.module';
import { HomeModule } from './modules/home/home.module';
import { SideBarModule } from './modules/sidebar/sidebar.module';

export const routes: Routes = [
  {
    path: NATI_BACKEND_PATH,
    children: [
      { module: HealthcheckModule, path: '/healthcheck' },
      { module: CategoriesModule, path: '/categories' },
      { module: SideBarModule, path: '/sidebar' },
      { module: AppModule, path: '/auth' },
      { module: HomeModule, path: '/home' },
    ],
  },
];

export const controllersModules: Array<Type> = (routes[0].children as Route[]).map((c) => c.module as Type);
