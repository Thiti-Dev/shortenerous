import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class GQLSignInResponse {
  @Field()
  access_token: string
}
