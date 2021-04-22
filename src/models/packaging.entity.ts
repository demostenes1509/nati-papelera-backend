import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { Provider } from './provider.entity';
import { Product } from './product.entity';

@Entity('packaging')
export class Packaging extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'name' })
  name: string;

  @Column('character varying', { nullable: false, length: 255, name: 'provider_product_id' })
  providerProductId: string;

  @ManyToOne(() => Provider, (provider: Provider) => provider.packaging, {
    nullable: false,
  })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column({ name: 'provider_id', nullable: false })
  providerId: string;

  @ManyToOne(() => Product, (product: Product) => product.packaging, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_id', nullable: false })
  productId: string;

  @Column('numeric', {
    nullable: true,
    default: 0,
    precision: 9,
    scale: 2,
    name: 'price',
  })
  price: number;
}
