import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProviderParser } from './abstract-provider-parser';
import { MapapelProvider } from './manapel-parser';

@Injectable()
export class AbstractParserProvider {
  @Inject()
  private manapelProviderParser: MapapelProvider;

  getParser = (providerName: string): ProviderParser => {
    if (providerName === 'manapel') return this.manapelProviderParser;
    throw new BadRequestException('Parser not found for that provider');
  };
}
