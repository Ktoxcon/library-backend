import { Request, Response } from "express";
import { IUserModel, UserModel } from "../../database";
import { generatePassword, sign, verifyPassword } from "../../libraries";
import { UserError } from "./error/UserError";
import { HttpError } from "../../libraries";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    let {
      uid,
      name,
      lastname,
      username,
      role,
      password,
    }: IUserModel = req.body;
    let user: IUserModel = new UserModel();

    const userExists = await UserModel.findOne({
      $and: [{ uid }, { username }],
    });

    if (Boolean(userExists)) {
      res.status(500).send({ error: UserError.userAlreadyExistsError });
    }

    const hashedPassword = await generatePassword(password);

    if (!Boolean(hashedPassword)) {
      res.status(500).send({ error: UserError.passwordHashingError });
    }

    user.uid = uid;
    user.name = name;
    user.lastname = lastname;
    user.username = username;
    user.role = role;
    user.password = hashedPassword as string;

    const userSaved = await user.save();

    if (!Boolean(userSaved)) {
      res.status(500).send({ error: UserError.saveUserError });
    }

    res.send({ userSaved, session: req.headers.authorization });
  } catch (err) {
    res.send({ error: new HttpError(err.code, err.message) });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const _id = req.params.id;

    const userUpdated = await UserModel.findByIdAndUpdate(
      _id,
      { data },
      { new: true }
    );

    if (!Boolean(userUpdated)) {
      res.send({ error: UserError.updateUserError });
    }

    res.send(userUpdated);
  } catch (err) {
    res.send({ error: new HttpError(err.code, err.message) });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userExists = await UserModel.findById(req.params.id);

    if (!Boolean(userExists)) {
      res.status(500).send({ error: UserError.userDoesntExistsError });
    }

    const userDeleted = await UserModel.findByIdAndDelete(userExists._id);

    if (!Boolean(userDeleted)) {
      res.status(500).send({ error: UserError.deleteUserError });
    }

    res.send({ deleted: true });
  } catch (err) {
    res.send({ error: new HttpError(err.code, err.message) });
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find({});

    if (!Boolean(users)) {
      res.status(500).send({ error: UserError.getUsersError });
    }

    res.send(users);
  } catch (err) {
    res.send({ error: new HttpError(err.code, err.message) });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!Boolean(user)) {
      res.send({ error: UserError.incorrectUsernameError });
    }

    const isPasswordCorrect = await verifyPassword(password, user.password);

    if (!Boolean(isPasswordCorrect)) {
      res.send({ error: UserError.incorrectPasswordError });
    }

    const authToken = await sign(user.toJSON());

    if (!Boolean(authToken)) {
      res.send({ error: UserError.LoginError });
    }

    res.send({ authToken });
  } catch (err) {
    res.send({ error: new HttpError(err.code, err.message) });
  }
};

export const UserController = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  login,
};
