import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { capitalizeLine } from '../../../../helpers/string';
import * as xslx from 'xlsx';
import { UploadedFileProps } from '../../../../helpers/interfaces';
import { Logger } from '../../../../helpers/logger';
import { Category, Packaging, Product, Provider } from '../../../../models';
import { CategoriesService } from '../../../../modules/categories/categories.service';
import { PackagingService } from '../../../../modules/packaging/packaging.service';
import { ProductsService } from '../../../../modules/products/products.service';
import { ProviderParser, ParseResult } from '../abstract-provider-parser';
import { ManapelParser } from './manapel-parser';

interface MapsaRecord {
  ARTICULO: string;
  NOMBRE: string;
  ' PRECIO ': number;
  anterior: number;
  '% aumento': number;
  CANTIDAD: number;
  BLOQUE: string;
}

@Injectable()
export class MapapelProviderParser extends ProviderParser {
  private readonly logger = new Logger(MapapelProviderParser.name);

  @Inject()
  private readonly productService: ProductsService;

  @Inject()
  private readonly packagingService: PackagingService;

  @Inject()
  private readonly categoryService: CategoriesService;

  async parseFile(provider: Provider, file: UploadedFileProps): Promise<ParseResult> {
    const result: ParseResult = {
      insertedRecords: 0,
      updatedRecords: 0,
    };

    this.logger.debug('Reading xls');
    const parser = new ManapelParser();
    const workbook = xslx.read(file.buffer, { type: 'buffer' });
    const sheetNamesList = workbook.SheetNames;
    if (sheetNamesList.length !== 1) {
      throw new BadRequestException('File is not correctly formatted');
    }
    let importOrder = 1;
    const excelData: Array<MapsaRecord> = xslx.utils.sheet_to_json<MapsaRecord>(workbook.Sheets[sheetNamesList[0]]);
    for (const row of excelData) {
      this.logger.debug(`Processing article ${row.ARTICULO}`);

      const packaging: Packaging = await this.packagingService.findByProvider({
        providerId: provider.id,
        providerProductId: row.ARTICULO,
      });

      if (!packaging) {
        this.logger.debug(`Article ${row.ARTICULO} does not exists`);
        const bloqueFirstWord = row.BLOQUE.split(' ')[0];
        const categoryToSearch = capitalizeLine(bloqueFirstWord);
        const category: Category = await this.categoryService.findOrCreate({ name: categoryToSearch });

        const capitalizedArticle = capitalizeLine(row.NOMBRE);
        const [productName, packaging] = parser.parseProduct(capitalizedArticle);

        const product: Product = await this.productService.findOrCreate({
          name: productName,
          description: `Descripción de ${productName}`,
          categoryId: category.id,
        });

        this.logger.debug(`Creating packaging ${row.ARTICULO}`);
        await this.packagingService.create({
          name: packaging || ' x Unidad',
          productId: product.id,
          providerId: provider.id,
          providerProductId: row.ARTICULO,
          price: row[' PRECIO '],
          importOrder,
        });
        importOrder++;
        result.insertedRecords++;
      } else {
        this.logger.debug(`Updating packaging ${row.ARTICULO} price`);
        await this.packagingService.update({
          id: packaging.id,
          name: packaging.name,
          price: row[' PRECIO '],
        });
        result.updatedRecords++;
      }
    }
    return result;
  }
}
