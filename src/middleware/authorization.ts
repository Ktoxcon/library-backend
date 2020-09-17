import { Request, Response, NextFunction } from "express";
import { verify } from "../libraries";
import { UserError } from "../controller";
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
      res.send({ error: UserError.unauthorizedError });
    } else {
      next();
    }
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        res.send({ error: UserError.sessionExpiredError });
        break;
      default:
        console.log(err);
    }
  }
};
