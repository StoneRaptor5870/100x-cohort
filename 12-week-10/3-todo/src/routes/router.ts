import { Router } from "express";
import { userRouter } from "./userRoutes";
import { todoRouter } from "./todoRoutes";

export const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/todo", todoRouter);