import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';

@Entity('categories')
export class Category extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'name' })
  name: string;

  @Column('character varying', { nullable: false, length: 255, name: 'url' })
  url: string;
}
