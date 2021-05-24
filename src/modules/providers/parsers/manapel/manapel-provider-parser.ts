import { BadRequestException, Inject } from '@nestjs/common';
import * as xslx from 'xlsx';
import { UploadedFileProps } from '../../../../helpers/interfaces';
import { Logger } from '../../../../helpers/logger';
import { capitalizeLine } from '../../../../helpers/string';
import { Category, Packaging, Product, Provider } from '../../../../models';
import { CategoriesService } from '../../../../modules/categories/categories.service';
import { PackagingService } from '../../../../modules/packaging/packaging.service';
import { ProductsService } from '../../../../modules/products/products.service';
import { ParseResult, ProviderParser } from '../abstract-provider-parser';
import { ManapelParser } from './manapel-parser';

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
    for (const row of excelData) {
      const rowValues2 = Object.values(row);

      const articulo = rowValues2[0];
      const nombre = rowValues2[1];
      const precio = rowValues2[2];
      // const anterior = rowValues2.length === 7 ? rowValues2[3] : null;
      // const aumento = rowValues2.length === 7 ? rowValues2[4] : rowValues2[3];
      // const cantidad = rowValues2.length === 7 ? rowValues2[5] : rowValues2[4];
      const bloque = rowValues2.length === 7 ? rowValues2[6] : rowValues2[5];

      this.logger.debug(`Processing article ${articulo}`);

      const packaging: Packaging = await this.packagingService.findByProvider({
        providerId: provider.id,
        providerProductId: articulo,
      });

      if (!packaging) {
        this.logger.debug(`Article ${articulo} does not exists`);
        const bloqueFirstWord = bloque.split(' ')[0];
        const categoryToSearch = capitalizeLine(bloqueFirstWord);
        const category: Category = await this.categoryService.findOrCreate({ name: categoryToSearch });

        const capitalizedArticle = capitalizeLine(nombre);
        const [productName, packaging] = parser.parseProduct(capitalizedArticle);

        const product: Product = await this.productService.findOrCreate({
          name: productName,
          description: `Descripción de ${productName}`,
          categoryId: category.id,
        });

        this.logger.debug(`Creating packaging ${articulo}`);
        await this.packagingService.create({
          name: packaging || ' x Unidad',
          productId: product.id,
          providerId: provider.id,
          providerProductId: articulo,
          price: precio,
          importOrder,
        });
        importOrder++;
        result.insertedRecords++;
      } else {
        this.logger.debug(`Updating packaging ${articulo} price`);
        await this.packagingService.update({
          id: packaging.id,
          name: packaging.name,
          price: precio,
        });
        result.updatedRecords++;
      }
    }
    return result;
  }
}
