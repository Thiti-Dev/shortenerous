import { Service, Inject } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { BadRequestError } from "../custom-errors/BadRequestError";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
import { SignInInput } from "../resolvers/InputTypes/Auth.inputTypes";
import { GQLSignInResponse } from "../resolvers/returnTypes/Auth.returnTypes";

import * as jwt from 'jsonwebtoken'


@Service()
export class AuthService {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository
  ) {}

  private getSignedTokenFromUserEntity(entity: User):string{
    const privateKey = process.env.JWT_SECRET || "indeed it exist"
    const dataToBeSigned = {
      email: entity.email,
      id: entity.id,
      firstname: entity.firstName,
      lastname: entity.lastName
    }
    return jwt.sign(dataToBeSigned,privateKey,{expiresIn: '24h'})
  }

  async signIn(input: SignInInput): Promise<GQLSignInResponse>{
    const {email,password} = input
    const user = await this.userRepository.findOne({email})
    if(!user) throw new BadRequestError(`user with email:"${email}" doesn't exist in the database`)

    if(!(await user.validatePassword(password))) throw new BadRequestError(`invalid username/password`)
    
    const response = new GQLSignInResponse()
    response.access_token = this.getSignedTokenFromUserEntity(user)
    return response
    
  }
}
