import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
import { ColumnsNumericTransformer } from '../helpers/transformers.helper';

@Entity('configuration')
export class Configuration extends AbstractEntity {
  @Column('numeric', {
    nullable: true,
    default: 0,
    precision: 5,
    scale: 2,
    name: 'ml_commission_percentage',
    transformer: new ColumnsNumericTransformer(),
  })
  mlCommissionPercentage: number;

  @Column('numeric', {
    nullable: true,
    default: 0,
    precision: 5,
    scale: 2,
    name: 'ml_gain_percentage',
    transformer: new ColumnsNumericTransformer(),
  })
  mlGainPercentage: number;
}
