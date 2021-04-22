import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { Category } from './category.entity';
import { Packaging } from './packaging.entity';

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

  @Column({ name: 'category_id', nullable: false })
  categoryId: string;

  @OneToMany(() => Packaging, (packaging: Packaging) => packaging.product, { cascade: false })
  packaging: Packaging[];
}
