import { Routes, Route } from 'nest-router';
import { Type } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { APPPATH } from './helpers/constants';

export const routes: Routes = [
  {
    path: APPPATH,
    children: [
      { module: HelloModule, path: '/hello' },
      { module: HealthcheckModule, path: '/healthcheck' },
    ],
  },
];

export const appModules: Array<Type> = (routes[0].children as Route[]).map((c) => c.module as Type);
