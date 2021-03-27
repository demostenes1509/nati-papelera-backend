import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { RolesGuard } from './helpers/guards';
import { rdbmsParams } from './helpers/rdbms';
import { AuthModule } from './modules/auth/auth.module';
import { routes, controllersModules } from './routes';

@Module({
  imports: [RouterModule.forRoutes(routes), TypeOrmModule.forRoot(rdbmsParams()), ...controllersModules, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
