import { Router } from "express";
import { createTodo, getTodo, updateTodoHandler, deleteTodoHandler } from "../controllers/todoController";
import { verifyToken } from "../middlewares/authMiddleware";

export const todoRouter = Router();

todoRouter.get("/getTodo", verifyToken, getTodo);
todoRouter.post("/postTodo", verifyToken, createTodo);
todoRouter.put("/updateTodo/:todoId", verifyToken, updateTodoHandler);
todoRouter.delete("/deleteTodo/:todoId", verifyToken, deleteTodoHandler);
