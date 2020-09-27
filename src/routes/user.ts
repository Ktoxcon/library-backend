import { Router } from "express";
import { AuthenticationController } from "../controller";

export const userRouter = Router();

userRouter.post("/signIn", AuthenticationController.login);
