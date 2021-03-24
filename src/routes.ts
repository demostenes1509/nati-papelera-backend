import { Routes, Route } from 'nest-router';
import { Type } from '@nestjs/common';
import { HealthcheckModule } from './controllers/healthcheck/healthcheck.module';
import { CategoriesModule } from './controllers/categories/categories.module';
import { NATI_BACKEND_PATH } from './helpers/constants';

export const routes: Routes = [
  {
    path: NATI_BACKEND_PATH,
    children: [
      { module: HealthcheckModule, path: '/healthcheck' },
      { module: CategoriesModule, path: '/categories' },
    ],
  },
];

export const appModules: Array<Type> = (routes[0].children as Route[]).map((c) => c.module as Type);
