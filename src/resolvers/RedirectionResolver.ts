import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Redirection } from "../entity/Redirection";
import { RedirectionService } from "../service/RedirectionService";
import { CreateRedirectionInput } from "./InputTypes/Redirection.inputTypes";

@Service()
@Resolver()
export class RedirectionResolver {
  constructor(private readonly redirectionService: RedirectionService) {}

  @Mutation(() => Redirection)
  async createRedirection(
    @Arg("input", () => CreateRedirectionInput) input: CreateRedirectionInput
  ) {
    return this.redirectionService.createRedirection(input)
  }

  @Query(() => Redirection,{nullable:true})
  async redirection(
    @Arg("path", () => String) path:string
  ){
    return this.redirectionService.getRedirection(path)
  }
}
