import { Query, Resolver } from "type-graphql";

@Resolver()
export class HandShakeResolver {
  @Query(() => String)
  shake() {
    return "ai yoo , wassups!";
  }
}
