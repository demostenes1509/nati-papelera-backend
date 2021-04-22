import { Provider } from '../../../models';
import { UploadedFileProps } from '../../../helpers/interfaces';

export abstract class ProviderParser {
  abstract parseFile(provider: Provider, file: UploadedFileProps);
}
