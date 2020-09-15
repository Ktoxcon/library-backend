import { Request, Response } from "express";
import { IUserModel, UserModel } from "../../database";
import { generatePassword } from "../../libraries";
import { UserError } from "./error/UserError";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    let { uid, name, lastname, role, password }: IUserModel = req.body.params;
    let user: IUserModel = new UserModel();

    const userExists = await UserModel.findOne({
      $and: [{ uid }, { name }, { lastname }],
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
    user.role = role;
    user.password = hashedPassword as string;

    const userSaved = await user.save();

    if (Boolean(userSaved)) {
      res.status(500).send({ error: UserError.saveUserError });
    }

    res.send(userSaved);
  } catch (err) {
    res.send({});
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (err) {}
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
  } catch (err) {}
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find({});

    if (!Boolean(users)) {
      res.status(500).send({ error: UserError.getUsersError });
    }

    res.send(users);
  } catch (err) {}
};

export const UserController = {
  createUser,
  deleteUser,
  getUsers,
};
