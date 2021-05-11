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

const ColumnsIndexesEnum = {
  ARTICULO: 0,
  NOMBRE: 1,
  PRECIO: 2,
  ANTERIOR: 3,
  CANTIDAD: 4,
  BLOQUE: 5,
};

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
    const excelData = xslx.utils.sheet_to_json(workbook.Sheets[sheetNamesList[0]]);
    for (const row1 of excelData) {
      const rowValues = Object.values(row1);

      this.logger.debug(`Processing article ${rowValues[ColumnsIndexesEnum.ARTICULO]}`);

      const packaging: Packaging = await this.packagingService.findByProvider({
        providerId: provider.id,
        providerProductId: rowValues[ColumnsIndexesEnum.ARTICULO],
      });

      if (!packaging) {
        this.logger.debug(`Article ${rowValues[ColumnsIndexesEnum.ARTICULO]} does not exists`);
        const bloqueFirstWord = rowValues[ColumnsIndexesEnum.BLOQUE].split(' ')[0];
        const categoryToSearch = capitalizeLine(bloqueFirstWord);
        const category: Category = await this.categoryService.findOrCreate({ name: categoryToSearch });

        const capitalizedArticle = capitalizeLine(rowValues[ColumnsIndexesEnum.NOMBRE]);
        const [productName, packaging] = parser.parseProduct(capitalizedArticle);

        const product: Product = await this.productService.findOrCreate({
          name: productName,
          description: `Descripción de ${productName}`,
          categoryId: category.id,
        });

        this.logger.debug(`Creating packaging ${rowValues[ColumnsIndexesEnum.ARTICULO]}`);
        await this.packagingService.create({
          name: packaging || ' x Unidad',
          productId: product.id,
          providerId: provider.id,
          providerProductId: rowValues[ColumnsIndexesEnum.ARTICULO],
          price: rowValues[ColumnsIndexesEnum.PRECIO],
          importOrder,
        });
        importOrder++;
        result.insertedRecords++;
      } else {
        this.logger.debug(`Updating packaging ${rowValues[ColumnsIndexesEnum.ARTICULO]} price`);
        await this.packagingService.update({
          id: packaging.id,
          name: packaging.name,
          price: rowValues[ColumnsIndexesEnum.PRECIO],
        });
        result.updatedRecords++;
      }
    }
    return result;
  }
}
