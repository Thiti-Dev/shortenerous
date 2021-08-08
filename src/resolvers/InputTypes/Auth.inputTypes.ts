import { Length, IsEmail, IsNotEmpty } from "class-validator";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
export class SignInInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
