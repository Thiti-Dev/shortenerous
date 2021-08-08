import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { Redirection } from "../entity/Redirection";

import { AlreadyExistError } from "../custom-errors/AlreadyExistError";
import { CreateRedirectionInput } from "../resolvers/InputTypes/Redirection.inputTypes";
import { applyPropertiesValueFrom } from "../utils/common/property";
import { createRandomString } from "../utils/common/string";

@Service()
@EntityRepository(Redirection)
export class RedirectionRepository extends Repository<Redirection> {
    async createRedirection(input:CreateRedirectionInput){
        const redirection = applyPropertiesValueFrom<Redirection>(Redirection,input)
        redirection.prefer_path = createRandomString(10,true)
        return await redirection.save()
    }
    async getRedirection(path:string){
        return await this.findOne({prefer_path:path})
    }
}
