import { Hono } from "hono";
import {
  signup,
  signin,
  userProfile,
  getAllUsers,
} from "../controllers/userController";
import { authmiddleware } from '../middlewares/users';

export const userRouter = new Hono();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

userRouter.get("/profile/:id", authmiddleware, userProfile);
userRouter.get("/allUsers", authmiddleware, getAllUsers);
