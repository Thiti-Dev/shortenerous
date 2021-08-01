import { Service, Inject } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
import { CreateUserInput } from "../resolvers/InputTypes/User.InputTypes";

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

  async createUser(input: CreateUserInput): Promise<User> {
    return this.userRepository.createUser(input);
  }
}
