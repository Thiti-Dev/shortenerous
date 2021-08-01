import { Length, IsEmail, IsNotEmpty } from "class-validator";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { User } from "../entity/User";
import { UserService } from "../service/UserService";

import { CreateUserInput } from "./InputTypes/User.InputTypes";

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

  @Mutation(() => User)
  async createUser(
    @Arg("input", () => CreateUserInput) input: CreateUserInput
  ) {
    return this.userService.createUser(input);
  }
}
