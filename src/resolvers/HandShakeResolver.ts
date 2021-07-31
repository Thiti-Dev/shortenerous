import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";

@Service()
@Resolver()
export class HandShakeResolver {
  @Query(() => String)
  shake() {
    return "ai yoo , wassups!";
  }
}
