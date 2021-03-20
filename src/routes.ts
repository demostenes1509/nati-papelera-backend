import { Routes, Route } from 'nest-router'
import { Type } from '@nestjs/common'
import { HelloModule } from './hello/hello.module'
import { HealthcheckModule } from './healthcheck/healthcheck.module'

export const routes: Routes = [
  {
    path: '/',
    children: [
      { module: HelloModule, path: '/hello' },
      { module: HealthcheckModule, path: '/healthcheck' },
    ]
  }
]

export const appModules = (routes[0].children as Route[]).map(c => c.module as Type<any>)
