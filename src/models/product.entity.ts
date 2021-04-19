import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { Category } from './category.entity';
import { Provider } from './provider.entity';

@Entity('products')
export class Product extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'name' })
  name: string;

  @Column('character varying', { nullable: false, length: 255, name: 'description' })
  description: string;

  @Column('character varying', { nullable: false, length: 255, name: 'url' })
  url: string;

  @Column('character varying', { nullable: false, length: 255, name: 'provider_product_id' })
  providerProductId: string;

  @ManyToOne(() => Category, (category: Category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Provider, (provider: Provider) => provider.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;
}
