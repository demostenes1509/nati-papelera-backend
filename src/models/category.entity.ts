import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { Product } from './product.entity';

@Entity('categories')
export class Category extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'name' })
  name: string;

  @Column('character varying', { nullable: false, length: 255, name: 'url' })
  url: string;

  @Column('character varying', { nullable: false, length: 255, name: 'ml_category_id' })
  mlCategoryId: string;

  @OneToMany(() => Product, (product: Product) => product.category, { cascade: false })
  products: Product[];
}
