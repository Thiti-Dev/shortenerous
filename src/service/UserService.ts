import { Service, Inject } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

@Service()
export class UserService {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository
  ) {}
  async echo() {
    return "user echo";
  }

  async getUsers() {
    return this.userRepository.getUsers();
  }
}
