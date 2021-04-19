import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { Product } from './product.entity';

@Entity('providers')
export class Provider extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'name' })
  name: string;

  @OneToMany(() => Product, (product: Product) => product.provider, { cascade: false })
  products: Product[];
}
