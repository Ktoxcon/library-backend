import { Router } from "express";
import { UserController } from "../controller";
import { authorization } from "../middleware";
export const adminRouter = Router();

adminRouter.post("/admin/user", authorization, UserController.createUser);
adminRouter.get("/admin/user", authorization, UserController.getUsers);
adminRouter.delete("/admin/user/:id", authorization, UserController.deleteUser);
adminRouter.put("/admin/user/:id", authorization, UserController.updateUser);
