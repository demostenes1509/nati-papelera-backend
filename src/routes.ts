import { Routes, Route } from 'nest-router';
import { Type } from '@nestjs/common';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AppModule } from './modules/app/app.module';
import { NATI_BACKEND_PATH } from './helpers/constants';

export const routes: Routes = [
  {
    path: NATI_BACKEND_PATH,
    children: [
      { module: HealthcheckModule, path: '/healthcheck' },
      { module: CategoriesModule, path: '/categories' },
      { module: AppModule, path: '/auth' },
    ],
  },
];

export const controllersModules: Array<Type> = (routes[0].children as Route[]).map((c) => c.module as Type);
