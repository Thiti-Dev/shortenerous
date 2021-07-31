import { exit } from "process";
import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { User } from "../entity/User";
import { UserService } from "../service/UserService";

@Service()
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  echo() {
    return this.userService.echo();
  }

  @Query(() => [User])
  users() {
    return this.userService.getUsers();
  }
}
