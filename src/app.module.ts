import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { rdbmsParams } from './helpers/rdbms';
import { AuthModule } from './modules/auth/auth.module';
import { routes, controllersModules } from './routes';

@Module({
  imports: [RouterModule.forRoutes(routes), TypeOrmModule.forRoot(rdbmsParams()), ...controllersModules, AuthModule],
})
export class AppModule {}
