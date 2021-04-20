import { BadRequestException, Injectable } from '@nestjs/common';
import * as xslx from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFileProps } from '../../../../helpers/interfaces';
import { ProviderParser } from '../abstract-provider-parser';
import { capitalizeLine, Logger } from '../../../../helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, Product, Provider } from '../../../../models';
import { slugifyLine } from '../../../../helpers';
import { ManapelParser } from './manapel-parser';

interface MapsaRecord {
  ARTICULO: string;
  NOMBRE: string;
  ' PRECIO ': string;
  anterior: string;
  '% aumento': number;
  CANTIDAD: number;
  BLOQUE: string;
}

@Injectable()
export class MapapelProviderParser extends ProviderParser {
  private readonly logger = new Logger(MapapelProviderParser.name);

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async parseFile(provider: Provider, file: UploadedFileProps) {
    this.logger.log('Reading xls');
    const parser = new ManapelParser();
    const workbook = xslx.read(file.buffer, { type: 'buffer' });
    const sheetNamesList = workbook.SheetNames;
    if (sheetNamesList.length !== 1) {
      throw new BadRequestException('File is not correctly formatted');
    }
    const excelData: Array<MapsaRecord> = xslx.utils.sheet_to_json<MapsaRecord>(workbook.Sheets[sheetNamesList[0]]);
    for (const row of excelData) {
      this.logger.debug(`Processing article ${row.ARTICULO}`);

      const product: Product = await this.productRepository.findOne({
        where: { provider, providerProductId: row.ARTICULO },
      });

      if (!product) {
        this.logger.debug(`Article ${row.ARTICULO} does not exists`);
        const bloqueFirstWord = row.BLOQUE.split(' ')[0];
        const categoryToSearch = capitalizeLine(bloqueFirstWord);

        let category: Category = await this.categoryRepository.findOne({
          where: { name: categoryToSearch },
        });

        if (!category) {
          this.logger.debug(`Category ${categoryToSearch} does not exists`);
          category = await this.categoryRepository.save({
            id: uuidv4(),
            name: categoryToSearch,
            url: slugifyLine(categoryToSearch),
          });
        }

        const capitalizedOriginalProductName = capitalizeLine(row.NOMBRE);

        // try {
        const [productName, packaging] = parser.parseProduct(capitalizedOriginalProductName);
        // } catch (error) {
        //   console.log(capitalizedOriginalProductName);
        // }

        if (!packaging || packaging.length === 0) {
          console.log('==============');
          console.log(capitalizedOriginalProductName);
          console.log('==============');
        } else {
          console.log(`[${productName}] [${packaging}]`);
        }

        this.logger.debug(`Creating product ${row.NOMBRE}`);
        await this.productRepository.save({
          id: uuidv4(),
          provider,
          providerProductId: row.ARTICULO,
          category,
          name: capitalizedOriginalProductName,
          url: slugifyLine(capitalizedOriginalProductName),
        });
      }

      // console.log(row);
    }

    // if (errorvar) {
    throw new BadRequestException();
    // }
  }
}
