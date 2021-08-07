import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { Redirection } from "../entity/Redirection";

import { AlreadyExistError } from "../custom-errors/AlreadyExistError";
import { CreateRedirectionInput } from "../resolvers/InputTypes/Redirection.inputTypes";

@Service()
@EntityRepository(Redirection)
export class RedirectionRepository extends Repository<Redirection> {
    async createRedirection(input:CreateRedirectionInput){
        return "lol"
    }
}
