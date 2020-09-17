import { Router } from "express";
import { UserController } from "../controller";

export const userRouter = Router();

userRouter.post("/signUp", UserController.login);
