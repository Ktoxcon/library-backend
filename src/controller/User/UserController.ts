import { Request, Response } from "express";
import { IUserModel, UserModel } from "../../database";
import { displayError, generatePassword } from "../../libraries";
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
      return;
    } else {
      const hashedPassword = await generatePassword(password);

      if (!Boolean(hashedPassword)) {
        res.status(500).send({ error: UserError.passwordHashingError });
        return;
      } else {
        user.uid = uid;
        user.name = name;
        user.lastname = lastname;
        user.username = username;
        user.role = role;
        user.password = hashedPassword as string;

        const userSaved = await user.save();

        if (!Boolean(userSaved)) {
          res.status(500).send({ error: UserError.saveUserError });
          return;
        } else {
          res.send({ userSaved, session: req.headers.authorization });
        }
      }
    }
  } catch (err) {
    displayError(err.name, err.message);
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
      return;
    } else {
      res.send(userUpdated);
    }
  } catch (err) {
    displayError(err.name, err.message);
    res.status(500).send({ error: new HttpError(err.code, err.message) });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userExists = await UserModel.findById(req.params.id);

    if (!Boolean(userExists)) {
      res.status(500).send({ error: UserError.userDoesntExistsError });
      return;
    } else {
      const userDeleted = await UserModel.findByIdAndDelete(userExists._id);

      if (!Boolean(userDeleted)) {
        res.status(500).send({ error: UserError.deleteUserError });
        return;
      }

      res.send({ deleted: true });
    }
  } catch (err) {
    displayError(err.name, err.message);
    res.status(500).send({ error: new HttpError(err.code, err.message) });
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find({});

    if (!Boolean(users)) {
      res.status(500).send({ error: UserError.getUsersError });
      return;
    } else {
      res.send(users);
    }
  } catch (err) {
    displayError(err.name, err.message);
    res.status(500).send({ error: new HttpError(err.code, err.message) });
  }
};

export const createDefaultUser = async (): Promise<boolean> => {
  try {
    const admin = new UserModel();
    admin.name = "admin";
    admin.lastname = "admin";
    admin.username = "admin";
    admin.uid = "0";
    admin.role = "admin";
    admin.password = (await generatePassword("root")) as string;

    const adminExists = await UserModel.findOne({ uid: "0" });

    if (Boolean(adminExists)) {
      return true;
    }

    const adminCreated = await admin.save();

    if (Boolean(adminCreated)) {
      return true;
    }

    return false;
  } catch (err) {
    displayError(err.name, err.message);
  }
};

export const UserController = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
};
