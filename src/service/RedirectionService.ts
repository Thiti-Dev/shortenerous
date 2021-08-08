import { Service, Inject } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { RedirectionRepository } from "../repository/RedirectionRepository";
import { CreateRedirectionInput } from "../resolvers/InputTypes/Redirection.inputTypes";

@Service()
export class RedirectionService {
    constructor(
        @InjectRepository()
        private readonly redirectionRepository: RedirectionRepository
    ) {}
    async createRedirection(input:CreateRedirectionInput){
        return this.redirectionRepository.createRedirection(input)
    }
    async getRedirection(path:string){
        return this.redirectionRepository.getRedirection(path)
    }
}
