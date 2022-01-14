import { Field, ObjectType } from '@nestjs/graphql';
import { Entity,BaseEntity, JoinColumn, ManyToMany, OneToMany, OneToOne  } from 'typeorm';
import { Column, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from './role.entity';
import { Token } from './token.entity';
import { UserRole } from './user-role.entity';

export enum ROLE{
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN'
}
@Entity('User') 
@ObjectType()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Field()
  @Column({unique: true})
  email!: string

  @Field()
  @Column()
  firstName!: string

  @Field()
  @Column()
  lastName!: string

  @Field()
  @Column()
  password!: string

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRole: UserRole[]

  @OneToOne(() => Token, token => token.user)
  token: Token
}