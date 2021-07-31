import { Service, Inject } from "typedi";

@Service()
export class UserService {
  async echo() {
    return "user echo";
  }
}
