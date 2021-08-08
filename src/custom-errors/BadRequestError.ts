import { ApolloError } from "apollo-server-errors";

const ERROR_CODE = "BAD_REQUEST";

export class BadRequestError extends ApolloError {
  constructor(message: string) {
    super(message, ERROR_CODE);

    Object.defineProperty(this, "name", { value: ERROR_CODE });
  }
}
