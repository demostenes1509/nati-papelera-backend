import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as xslx from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFileProps } from '../../../../helpers/interfaces';
import { ProviderParser } from '../abstract-provider-parser';
import { capitalizeLine, Logger } from '../../../../helpers';
import { Category, Packaging, Product, Provider } from '../../../../models';
import { slugifyLine } from '../../../../helpers';
import { ManapelParser } from './manapel-parser';
import { CategoriesService } from '../../../../modules/categories/categories.service';
import { ProductsService } from '../../../../modules/products/products.service';
import { PackagingService } from '../../../../modules/packaging/packaging.service';

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
        let [productName, packaging] = parser.parseProduct(capitalizedArticle);

        if (!packaging || packaging.length === 0) {
          packaging = ' x unidad';
        }
        console.log(`[${productName}] [${packaging}]`);

        const product: Product = await this.productService.findOrCreate({
          name: productName,
          categoryId: category.id,
        });

        await this.packagingService.create({
          name: packaging,
          productId: product.id,
          providerId: provider.id,
          providerProductId: row.ARTICULO,
          price: row[' PRECIO '],
        });
      }

      // console.log(row);
    }

    // if (errorvar) {
    // throw new BadRequestException();
    // }
  }
}
