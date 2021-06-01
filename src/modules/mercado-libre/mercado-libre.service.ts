import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadedFileProps } from 'src/interfaces/uploaded-file.interface';
import { Repository } from 'typeorm';
import * as zlib from 'zlib';
import { Logger } from '../../helpers/logger.helper';
import { postMercadoLibre } from '../../helpers/mercadolibre.helper';
import { UserTokenInfo } from '../../interfaces/request.interface';
import { MercadoLibreCategory } from '../../models';
import { Packaging } from '../../models/packaging.entity';
import { MercadoLibreCategoriesGetAllRequestDto } from './dto/mercado-libre-get-all-categories-request.dto';

interface MercadoLibreNode {
  id: string;
  name: string;
}

interface MercadoLibreRecord extends MercadoLibreNode {
  path_from_root: Array<MercadoLibreNode>;
  children_categories: Array<MercadoLibreNode>;
}

@Injectable()
export class MercadoLibreService {
  private readonly logger = new Logger(MercadoLibreService.name);

  @InjectRepository(MercadoLibreCategory)
  private readonly categoryRepository: Repository<MercadoLibreCategory>;

  async getAllCategories(dto: MercadoLibreCategoriesGetAllRequestDto): Promise<Partial<MercadoLibreCategory>[]> {
    this.logger.debug('Getting category pattern');

    const query = `WITH RECURSIVE t
                    AS (
                      SELECT sa.id, sa.name, sa.parent_id, sa.childs
                      FROM mercado_libre_categories sa
                      WHERE sa.name ilike $1
                      AND sa.childs = 0
                      UNION ALL
                      SELECT next.id, next.name, next.parent_id, next.childs
                      FROM t prev
                      JOIN mercado_libre_categories next ON (next.id = prev.parent_id)
                    )
                    SELECT DISTINCT * FROM t
                    ORDER BY t.name
                    LIMIT 20
    `;

    const results = await this.categoryRepository.query(query, [`%${dto.pattern}%`]);
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
    return categories;
  }

  async postProduct(user: UserTokenInfo, packaging: Packaging): Promise<void> {
    const title = `${packaging.product.name} ${packaging.name}`;
    const description = `${packaging.product.description}`;
    const price = Math.ceil(packaging.price);
    const category_id = packaging.product.category.mlCategoryId;

    const body = {
      title: title,
      category_id,
      price: price,
      currency_id: 'ARS',
      available_quantity: 10,
      buying_mode: 'buy_it_now',
      condition: 'new',
      listing_type_id: 'gold_special',
      description: {
        plain_text: description,
      },
      video_id: 'YOUTUBE_ID_HERE',
      sale_terms: [
        {
          id: 'WARRANTY_TYPE',
          value_name: 'Garantía del vendedor',
        },
        {
          id: 'WARRANTY_TIME',
          value_name: '1 día',
        },
      ],
      pictures: [
        {
          source: 'http://mla-s2-p.mlstatic.com/968521-MLA20805195516_072016-O.jpg',
        },
      ],
      attributes: [
        {
          id: 'BRAND',
          value_name: 'Marca del producto',
        },
        {
          id: 'EAN',
          value_name: '7898095297749',
        },
      ],
    };

    const response = await postMercadoLibre(user, 'items', body);
    console.log(response);
  }

  async processCategories(file: UploadedFileProps): Promise<void> {
    const fileToProcess = await JSON.parse(zlib.unzipSync(file.buffer).toString());
    let procesados = 0;
    for (const value of Object.values<MercadoLibreRecord>(fileToProcess)) {
      const { id, name, children_categories } = value;
      const recordsToInsert = [];
      recordsToInsert.push({ id, name, childs: children_categories.length });
      recordsToInsert.push(...children_categories.map((cc) => ({ id: cc.id, name: cc.name, parentId: id, childs: 0 })));
      await this.categoryRepository.save(recordsToInsert);
      procesados += recordsToInsert.length;
      this.logger.verbose('Records processed:' + procesados);
    }
    this.logger.log('Records processed:' + procesados);

    /*
    const query = `WITH RECURSIVE t
                    AS (
                      SELECT sa.id, sa.name, sa.parent_id, sa.childs
                      FROM mercado_libre_categories sa
                      WHERE sa.name ilike 'rejilla%'
                      AND sa.childs = 0
                      UNION ALL
                      SELECT next.id, next.name, next.parent_id, next.childs
                      FROM t prev
                      JOIN mercado_libre_categories next ON (next.id = prev.parent_id)
                    )
                    SELECT DISTINCT * FROM t
    `;

    const results = await this.categoryRepository.query(query);
    const tree = results.filter((r) => r.childs === 0);
    const categories = [];
    for (const treenode of tree) {
      let current = treenode;
      let name = current.name;
      do {
        let parentId = current.parent_id;
        const parent = results.find((t) => t.id === parentId);
        if (parent) {
          name = parent?.name + ' - ' + name;
        }
        current = parent;
      } while (current);
      categories.push({ id: treenode.id, name });
    }

    console.log(categories);
    */
  }
}
