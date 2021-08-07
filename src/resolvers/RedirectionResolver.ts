import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Redirection } from "../entity/Redirection";
import { RedirectionService } from "../service/RedirectionService";

@Service()
@Resolver()
export class UserResolver {
  constructor(private readonly redirectionService: RedirectionService) {}

}
