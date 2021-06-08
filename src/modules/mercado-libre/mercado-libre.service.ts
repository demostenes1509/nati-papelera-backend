import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as zlib from 'zlib';
import { Logger } from '../../helpers/logger.helper';
import { postMercadoLibre, putMercadoLibre } from '../../helpers/mercadolibre.helper';
import { MercadoLibreArticle } from '../../interfaces/mercado-libre-product.interface';
import { UserTokenInfo } from '../../interfaces/request.interface';
import { UploadedFileProps } from '../../interfaces/uploaded-file.interface';
import { MercadoLibreCategory } from '../../models';
import { Packaging } from '../../models/packaging.entity';
import { MercadoLibreCategoriesGetAllRequestDto } from './dto/mercado-libre-get-all-categories-request.dto';
import { MercadoLibreGetCategoryRequestDto } from './dto/mercado-libre-get-category-request.dto';
import * as getEnv from 'getenv';

const API_URL = getEnv('API_URL');
interface MercadoLibreNode {
  id: string;
  name: string;
}

interface MercadoLibreAttribute {
  id: string;
  values: Array<MercadoLibreNode>;
}

interface MercadoLibreRecord extends MercadoLibreNode {
  path_from_root: Array<MercadoLibreNode>;
  children_categories: Array<MercadoLibreNode>;
  attributes: Array<MercadoLibreAttribute>;
}

@Injectable()
export class MercadoLibreService {
  private readonly logger = new Logger(MercadoLibreService.name);

  @InjectRepository(MercadoLibreCategory)
  private readonly categoryRepository: Repository<MercadoLibreCategory>;

  async getAllCategoriesByPattern(
    dto: MercadoLibreCategoriesGetAllRequestDto,
  ): Promise<Partial<MercadoLibreCategory>[]> {
    this.logger.debug('Getting category pattern:' + dto.pattern);
    return await this.getAllCategories(`%${dto.pattern}%`, 'sa.name ilike $1 ');
  }

  async getAllCategories(value: string, where: string): Promise<Partial<MercadoLibreCategory>[]> {
    const query = `WITH RECURSIVE t
                    AS (
                      SELECT sa.id, sa.name, sa.parent_id, sa.childs
                      FROM mercado_libre_categories sa
                      WHERE ${where}
                      AND sa.childs = 0
                      UNION ALL
                      SELECT next.id, next.name, next.parent_id, next.childs
                      FROM t prev
                      JOIN mercado_libre_categories next ON (next.id = prev.parent_id)
                    )
                    SELECT DISTINCT * FROM t
                    ORDER BY t.name
    `;

    const results = await this.categoryRepository.query(query, [value]);
    const tree = results.filter((r) => r.childs === 0);
    const categories: Partial<MercadoLibreCategory>[] = [];
    for (const treenode of tree) {
      let current = treenode;
      let name = current.name;
      do {
        const parentId = current.parent_id;
        const parent = results.find((t) => t.id === parentId);
        if (parent) {
          name = parent?.name + ' - ' + name;
        }
        current = parent;
      } while (current);
      categories.push({ id: treenode.id, name });
    }
    return categories.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
  }

  async publishProduct(user: UserTokenInfo, packaging: Packaging): Promise<MercadoLibreArticle> {
    const title = `${packaging.product.name} ${packaging.name}`;
    const description = `${packaging.product.description}`;
    const price = Math.ceil(packaging.price);
    const category_id = packaging.product.mlCategoryId || packaging.product.category.mlCategoryId;
    const id = packaging.mlProductId;
    const pictures = packaging.product.pictures.map((picture) => ({
      source: `${API_URL}/products-pictures/${picture.id}`,
    }));
    pictures.push({
      source:
        'https://media-exp1.licdn.com/dms/image/C4D03AQFI0QUe-Vh58Q/profile-displayphoto-shrink_100_100/0/1555444289536?e=1628726400&v=beta&t=qfPmLh78XHDYip6RpvTxqBg4midyXzUGbAFmqLHeySo',
    });

    const newFields = id
      ? {}
      : {
          listing_type_id: 'gold_special',
          description: {
            plain_text: description,
          },
        };

    const body = {
      title,
      category_id,
      price,
      currency_id: 'ARS',
      available_quantity: 1,
      buying_mode: 'buy_it_now',
      condition: 'new',
      ...newFields,
      // video_id: 'YOUTUBE_ID_HERE',
      // sale_terms: [
      //   {
      //     id: 'WARRANTY_TYPE',
      //     value_name: 'Garantía del vendedor',
      //   },
      //   {
      //     id: 'WARRANTY_TIME',
      //     value_name: '1 día',
      //   },
      // ],
      pictures,
      // attributes: [
      //   {
      //     id: 'BRAND',
      //     value_name: 'Marca del producto',
      //   },
      //   {
      //     id: 'EAN',
      //     value_name: '7898095297749',
      //   },
      // ],
    };

    const method = !id
      ? postMercadoLibre<MercadoLibreArticle>(user, `items`, body)
      : putMercadoLibre<MercadoLibreArticle>(user, `items/${id}`, body);
    const response = await method;
    this.logger.log(JSON.stringify(response, null, '   '));
    return response;
  }

  async processCategories(file: UploadedFileProps): Promise<void> {
    this.logger.log('Starting Categories Process');
    this.logger.log('File length:' + file.buffer.length);
    const fileToProcess = await JSON.parse(zlib.unzipSync(file.buffer).toString());
    let procesados = 0;
    for (const value of Object.values<MercadoLibreRecord>(fileToProcess)) {
      const { id, name, children_categories, attributes } = value;
      const recordsToInsert = [];

      const childrens = children_categories.map((cc) => ({ id: cc.id, name: cc.name, parentId: id, childs: 0 }));

      const productTypes = attributes
        ? attributes.find((a) => a.id === 'PRODUCT_TYPE')
        : // .values.map((v) => ({ id: v.id, name: v.name, parentId: id, childs: 0 }))
          null;
      const attrs = productTypes
        ? productTypes.values.map((v) => ({ id: v.id, name: v.name, parentId: id, childs: 0 }))
        : [];

      recordsToInsert.push({ id, name, childs: childrens.length + attrs.length });
      recordsToInsert.push(...childrens);
      recordsToInsert.push(...attrs);

      await this.categoryRepository.save(recordsToInsert);
      procesados += recordsToInsert.length;
      this.logger.log('Records processed:' + procesados);
    }
    this.logger.log('Process finished with records:' + procesados);
  }

  async getCategoryById(dto: MercadoLibreGetCategoryRequestDto): Promise<Partial<MercadoLibreCategory>> {
    const categories = await this.getAllCategories(dto.id, ' sa.id = $1 ');
    if (categories.length === 0) throw new NotFoundException();
    return categories[0];
  }
}
