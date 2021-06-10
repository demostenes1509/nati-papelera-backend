import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../../models';
import { AuthModule } from '../auth/auth.module';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';

@Module({
    imports: [TypeOrmModule.forFeature([Configuration]), AuthModule ],
    controllers: [ConfigurationController],
    providers: [ConfigurationService],
  })
  export class ConfigurationModule {}
  