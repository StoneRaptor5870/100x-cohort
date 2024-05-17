import { Hono } from "hono";
import {
  signup,
  signin,
  userProfile,
  getAllUsers,
} from "../controllers/userController";

export const userRouter = new Hono();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

userRouter.get("/profile/:id", userProfile);
userRouter.get("/allUsers", getAllUsers);
