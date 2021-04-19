import { BadRequestException, Injectable } from '@nestjs/common';
import * as xslx from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import { UploadedFileProps } from '../../../helpers/interfaces';
import { ProviderParser } from './abstract-provider-parser';
import { Logger } from '../../../helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, Product, Provider } from '../../../models';

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
export class MapsaParser extends ProviderParser {
  private readonly logger = new Logger(MapsaParser.name);

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async parseFile(provider: Provider, file: UploadedFileProps) {
    this.logger.log('Reading xls');
    const workbook = xslx.read(file.buffer, { type: 'buffer' });
    const sheetNamesList = workbook.SheetNames;
    if (sheetNamesList.length !== 1) {
      throw new BadRequestException('File is not correctly formatted');
    }
    const excelData: Array<MapsaRecord> = xslx.utils.sheet_to_json<MapsaRecord>(workbook.Sheets[sheetNamesList[0]]);
    for (const row of excelData) {
      this.logger.log(`Processing article ${row.ARTICULO}`);

      const product: Product = await this.productRepository.findOne({
        where: { provider, providerProductId: row.ARTICULO },
      });

      if (!product) {
        this.logger.log(`Article ${row.ARTICULO} does not exists`);
        const bloqueFirstWord = row.BLOQUE.split(' ')[0];
        const categoryToSearch = bloqueFirstWord.charAt(0).toUpperCase() + bloqueFirstWord.slice(1).toLowerCase();

        let category: Category = await this.categoryRepository.findOne({
          where: { name: categoryToSearch },
        });

        if (!category) {
          this.logger.log(`Category ${categoryToSearch} does not exists`);
          category = await this.categoryRepository.save({
            id: uuidv4(),
            name: categoryToSearch,
            url: slugify(categoryToSearch, { lower: true, strict: true }),
          });
        }

        this.logger.log(`Creating product ${row.NOMBRE}`);
        await this.productRepository.save({
          id: uuidv4(),
          provider,
          providerProductId: row.ARTICULO,
          category,
          name: row.NOMBRE,
          url: slugify(row.NOMBRE, { lower: true, strict: true }),
        });
      }

      console.log(row);
    }
  }
}
