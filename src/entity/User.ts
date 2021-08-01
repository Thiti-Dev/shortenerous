import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";

@ObjectType()
@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  //@Field()
  @Column()
  password: string;

  //@Field()
  @Column()
  salt: string;
}
