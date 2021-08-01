import { Length, IsEmail, IsNotEmpty } from "class-validator";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 255)
  @IsNotEmpty()
  password: string;

  @Field()
  @Length(3, 100)
  @IsNotEmpty()
  firstname: string;

  @Field()
  @Length(3, 100)
  @IsNotEmpty()
  lastname: string;
}
