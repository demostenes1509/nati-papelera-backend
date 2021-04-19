import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { Category } from './category.entity';

@Entity('products')
export class Product extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'name' })
  name: string;

  @Column('character varying', { nullable: false, length: 255, name: 'description' })
  description: string;

  @Column('character varying', { nullable: false, length: 255, name: 'url' })
  url: string;

  @ManyToOne(() => Category, (category: Category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
