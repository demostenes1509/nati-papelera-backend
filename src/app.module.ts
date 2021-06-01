import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { rdbmsParams } from './helpers/rdbms.helper';
import { AuthModule } from './modules/auth/auth.module';
import { controllersModules, routes } from './routes';

@Module({
  imports: [RouterModule.forRoutes(routes), TypeOrmModule.forRoot(rdbmsParams()), ...controllersModules, AuthModule],
})
export class AppModule {}
