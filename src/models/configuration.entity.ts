import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';

@Entity('configuration')
export class Configuration extends AbstractEntity {

  @Column('numeric', { nullable: true, default: 0, precision: 5, scale: 2, name: 'ml_commission_percentage' })
  ml_commission_percentage: number;

  @Column('numeric', { nullable: true, default: 0, precision: 5, scale: 2, name: 'ml_gain_percentage' })
  ml_gain_percentage: number;
}
