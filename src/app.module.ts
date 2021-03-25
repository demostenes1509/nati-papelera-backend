import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { rdbmsParams } from './helpers/rdbms';
import { routes, appModules } from './routes';

@Module({
  imports: [RouterModule.forRoutes(routes), TypeOrmModule.forRoot(rdbmsParams()), ...appModules],
})
export class AppModule {}
