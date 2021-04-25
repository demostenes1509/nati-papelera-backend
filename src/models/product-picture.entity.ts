import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { Product } from './product.entity';

@Entity('products_pictures')
export class ProductPicture extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'content_type' })
  contentType: string;

  @ManyToOne(() => Product, (product: Product) => product.pictures, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_id', nullable: false })
  productId: string;
}
