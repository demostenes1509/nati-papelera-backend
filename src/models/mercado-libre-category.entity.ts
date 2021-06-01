import { Column, Entity, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity('mercado_libre_categories')
export class MercadoLibreCategory {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column('character varying', { nullable: false, length: 255, name: 'name' })
  name: string;

  @Column({ name: 'parent_id' })
  parentId: string;

  @JoinColumn({ name: 'parent_id' })
  parent: MercadoLibreCategory;

  @Column({ name: 'childs' })
  childs: number;
}
