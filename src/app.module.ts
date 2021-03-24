import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { rdbmsParams } from './helpers/rdbms';
import { routes, appModules } from './routes';

@Module({
  imports: [RouterModule.forRoutes(routes), TypeOrmModule.forRoot(rdbmsParams()), ...appModules],
  // providers: [ValidationPipe],
})
export class AppModule {}
