import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { AuthService } from "../service/AuthService";
import { SignInInput } from "./InputTypes/Auth.inputTypes";
import { GQLSignInResponse } from "./returnTypes/Auth.returnTypes";

@Service()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => GQLSignInResponse)
  async signIn(
    @Arg("input", () => SignInInput) input: SignInInput
  ) {
    return this.authService.signIn(input)
  }
}
