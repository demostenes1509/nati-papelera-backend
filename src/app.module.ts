import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { routes, appModules } from './routes';

@Module({
  imports: [RouterModule.forRoutes(routes), ...appModules],
  providers: [],
})
export class AppModule {}
