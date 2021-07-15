import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { Product } from './product.entity';

@Entity('products_pictures')
export class ProductPicture extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'mime_type' })
  mimeType: string;

  @ManyToOne(() => Product, (product: Product) => product.pictures, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_id', nullable: false })
  productId: string;

  @Column({ name: 'with_logo', nullable: false })
  withLogo: boolean;
}
