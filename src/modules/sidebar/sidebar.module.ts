import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../models';
import { AuthModule } from '../auth/auth.module';
import { SideBarController } from './sidebar.controller';
import { SideBarService } from './sidebar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule],
  controllers: [SideBarController],
  providers: [SideBarService],
})
export class SideBarModule {}
