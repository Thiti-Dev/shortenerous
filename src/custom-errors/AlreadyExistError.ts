import { ApolloError } from "apollo-server-errors";

const ERROR_CODE = "ALREADY_EXIST";

export class AlreadyExistError extends ApolloError {
  constructor(message: string) {
    super(message, ERROR_CODE);

    Object.defineProperty(this, "name", { value: ERROR_CODE });
  }
}
