import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { CreateUserInput } from "../resolvers/InputTypes/User.InputTypes";

import * as bcrypt from "bcrypt";
import { AlreadyExistError } from "../custom-errors/AlreadyExistError";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers() {
    return await this.find();
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const { email, password, firstname, lastname } = input;

    const exist = await this.findOne({ email });
    if (exist) throw new AlreadyExistError("Email is already exist");

    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.firstName = firstname;
    user.lastName = lastname;
    return await user.save();
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
