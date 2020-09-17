import { HttpError } from "../../../libraries";

enum AuthenticationErrorCode {
  login = 10,
  unauthorized = 15,
  sessionExpired = 20,
  incorrectPassword = 25,
  incorrectUsername = 30,
}

const LoginError = new HttpError(
  AuthenticationErrorCode.login,
  "Login failed, try again later"
);

const incorrectUsernameError = new HttpError(
  AuthenticationErrorCode.incorrectUsername,
  "Incorrect username"
);

const incorrectPasswordError = new HttpError(
  AuthenticationErrorCode.incorrectPassword,
  "Incorrect password"
);

const unauthorizedError = new HttpError(
  AuthenticationErrorCode.unauthorized,
  "Unauthorized request"
);

const sessionExpiredError = new HttpError(
  AuthenticationErrorCode.sessionExpired,
  "Session expired"
);

export const AuthenticationError = {
  incorrectPasswordError,
  incorrectUsernameError,
  LoginError,
  unauthorizedError,
  sessionExpiredError,
};
