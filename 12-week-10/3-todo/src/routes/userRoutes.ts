import { Router } from "express";
import { login, signup, logout } from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", logout);