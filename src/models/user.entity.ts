import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity.entity';
@Entity('users')
export class User extends AbstractEntity {
  @Column('character varying', { nullable: false, length: 255, name: 'email_address' })
  emailAddress: string;

  @Column('character varying', { length: 255, name: 'full_name' })
  fullName: string;

  @Column('character varying', { length: 255, name: 'password' })
  password: string;

  @Column('character varying', { nullable: false, length: 255, name: 'role' })
  role: string;
}
