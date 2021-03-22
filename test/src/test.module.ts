import { Module } from '@nestjs/common';
import * as providers from './tests';

@Module({
  imports: [],
  controllers: [],
  providers: [...Object.values(providers)],
})
export class TestModule {}
