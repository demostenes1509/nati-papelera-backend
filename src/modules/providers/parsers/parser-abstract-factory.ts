import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProviderParser } from './abstract-provider-parser';
import { MapsaParser } from './mapsa-parser';

@Injectable()
export class AbstractParserProvider {
  @Inject()
  private mapsaProviderParser: MapsaParser;

  getParser = (providerName: string): ProviderParser => {
    if (providerName === 'mapsa') return this.mapsaProviderParser;
    throw new BadRequestException('Parser not found for that provider');
  };
}
