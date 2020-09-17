import { HttpError } from "../../../libraries";

enum UserErrorCode {
  userAlreadyExists = 100,
  userDoesntExists = 105,
  saveUser = 110,
  updateUser = 115,
  deleteUser = 120,
  getUsers = 125,
  hashingPassword = 150,
}

const userAlreadyExistsError = new HttpError(
  UserErrorCode.userAlreadyExists,
  "The User with that data already exists."
);

const passwordHashingError = new HttpError(
  UserErrorCode.hashingPassword,
  "Error trying to generate the user password."
);

const saveUserError = new HttpError(
  UserErrorCode.saveUser,
  "Error trying to save user."
);

const updateUserError = new HttpError(
  UserErrorCode.updateUser,
  "Error trying to update the user data."
);

const deleteUserError = new HttpError(
  UserErrorCode.deleteUser,
  "Error trying to delete the user."
);

const userDoesntExistsError = new HttpError(
  UserErrorCode.userDoesntExists,
  "The user with that id doesn't exists."
);

const getUsersError = new HttpError(
  UserErrorCode.getUsers,
  "Error trying to get users."
);

export const UserError = {
  userAlreadyExistsError,
  userDoesntExistsError,
  saveUserError,
  updateUserError,
  deleteUserError,
  getUsersError,
  passwordHashingError,
};
