import { Request, Response, NextFunction } from "express";
import { displayError, verify } from "../libraries";
import { AuthenticationError } from "../controller";
import { IUserModel } from "database";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers.authorization.replace(/["']/g, "");
    const payload = await verify(authToken);

    if (!Boolean(authToken) || (payload as IUserModel).role !== "admin") {
      res.send({ error: AuthenticationError.unauthorizedError });
    } else {
      next();
    }
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        res.send({ error: AuthenticationError.sessionExpiredError });
        break;
      default:
        console.log("the error was here");
        displayError(err.name, err.message);
    }
  }
};
