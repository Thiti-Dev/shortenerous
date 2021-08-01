import { GraphQLError } from "graphql";

const VALIDATION_ERROR_CODE = "ValidationError";

interface ILegacyValidationError {
  target: Object;
  property: string;
  children: Array<any>;
  constraints: Record<string, string>;
}

export const ApolloFormatErrorPipe = (error: GraphQLError) => {
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
    // other errror
    return error;
  }
};
