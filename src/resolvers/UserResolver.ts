import { exit } from "process";
import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { UserService } from "../service/UserService";

@Service()
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  echo() {
    return this.userService.echo();
  }
}
