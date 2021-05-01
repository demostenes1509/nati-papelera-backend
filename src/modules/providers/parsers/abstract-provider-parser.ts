import { Provider } from '../../../models';
import { UploadedFileProps } from '../../../helpers/interfaces';

export interface ParseResult {
  insertedRecords: number;
  updatedRecords: number;
}

export abstract class ProviderParser {
  abstract parseFile(provider: Provider, file: UploadedFileProps): Promise<ParseResult>;
}
