import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { Packaging } from './packaging.entity';

@Entity('providers')
export class Provider extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'name' })
  name: string;

  @Column('character varying', { nullable: false, length: 255, name: 'url' })
  url: string;

  @OneToMany(() => Packaging, (packaging: Packaging) => packaging.provider, { cascade: false })
  packaging: Packaging[];
}
