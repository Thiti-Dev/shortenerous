import { Length, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
export class CreateRedirectionInput {
  @Field()
  @IsString()
  base_path: string;
}
