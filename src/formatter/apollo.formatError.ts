import { GraphQLError } from "graphql";

const VALIDATION_ERROR_CODE = "ValidationError";
const GRAPHQL_BULITIN_VALIDATION_CODE = "GRAPHQL_VALIDATION_FAILED";

interface ILegacyValidationError {
  target: Object;
  property: string;
  children: Array<any>;
  constraints: Record<string, string>;
}

export const ApolloFormatErrorPipe = (error: GraphQLError) => {
  // @NOTE -> First handler for the validation from the class-transform to have the readable format
  try {
    const validationErrors = error.extensions.exception.validationErrors;
    const totalField = validationErrors.length; // this should throw the error if it isn't validation error -> so it would go down to the catch section
    const formatted_error_key_pair = {};

    validationErrors.forEach((error: ILegacyValidationError) => {
      //const key = Object.keys(error.constraints)[0];
      const value = Object.values(error.constraints)[0];
      formatted_error_key_pair[error.property] = value;
    });

    return {
      message: VALIDATION_ERROR_CODE,
      code: VALIDATION_ERROR_CODE,
      data: formatted_error_key_pair,
    };
  } catch (_) {
    // other errrors

    // @NOTE Handler for the built-in of graphql validation error ex (missing field . . . . bla bla bla)
    if (error.extensions.code === GRAPHQL_BULITIN_VALIDATION_CODE) {
      console.log(error.message);
      return {
        message: GRAPHQL_BULITIN_VALIDATION_CODE,
        code: GRAPHQL_BULITIN_VALIDATION_CODE,
        data: error.message,
      };
    }
    return error;
  }
};
