import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
@Unique(["base_path"])
export class Redirection extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  base_path: string;

  @Field()
  @Column()
  prefer_path: string;

  // SQLITE SUPPORTATION

  @CreateDateColumn({type: 'datetime' })
  created_at: Date

  @UpdateDateColumn({type: 'datetime' })
  updated_at: Date
}
