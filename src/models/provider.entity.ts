import { Max, Min } from 'class-validator';
import { Check, Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { Packaging } from './packaging.entity';

@Entity('providers')
export class Provider extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'name' })
  name: string;

  @Column('character varying', { nullable: false, length: 255, name: 'url' })
  url: string;

  @Column('numeric', { nullable: true, default: 0, precision: 5, scale: 2, name: 'percentage' })
  percentage: number;

  @OneToMany(() => Packaging, (packaging: Packaging) => packaging.provider, { cascade: false })
  packaging: Packaging[];
}
