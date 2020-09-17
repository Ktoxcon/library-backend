import { Request, Response } from "express";
import { IUserModel, UserModel } from "../../database";
import { AuthenticationError } from "./error";
import { HttpError } from "../../libraries/error";
import { verifyPassword, sign, displayError } from "../../libraries";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!Boolean(user)) {
      res.send({ error: AuthenticationError.incorrectUsernameError });
    }

    const isPasswordCorrect = await verifyPassword(password, user.password);

    if (!Boolean(isPasswordCorrect)) {
      res.send({ error: AuthenticationError.incorrectPasswordError });
    }

    const authToken = await sign(user.toJSON());

    if (!Boolean(authToken)) {
      res.send({ error: AuthenticationError.LoginError });
    }

    res.send({ authToken });
  } catch (err) {
    displayError(err.name, err.message);
    res.send({ error: new HttpError(err.code, err.message) });
  }
};

export const AuthenticationController = {
  login,
};
