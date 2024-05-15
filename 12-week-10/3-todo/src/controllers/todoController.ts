import { Response } from "express";
import { z } from "zod";
import { AuthRequest } from "../middlewares/authMiddleware";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const todoSchema = z.object({
  title: z.string(),
  description: z.string(),
  done: z.boolean().default(false),
  userId: z.number().optional()
});

export const getTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.id,
      },
      select: {
        user: true,
        title: true,
        description: true,
      },
    });
    return res.status(200).send({ todos });
  } catch (error) {
    return res.status(500).send({ message: "Error getting todos." });
  }
}

export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const parseResult = todoSchema.safeParse({ ...req.body, userId: req.id });
    if (!parseResult.success) {
      return res.status(400).send({ message: "Incorrect Inputs!" });
    }
  
    const { data } = parseResult;
  
    if (!req.id) {
      return res.status(400).send({ message: "User ID is required." });
    }
    const todo = await prisma.todo.create({
      data: {
        title: data.title,
        description: data.description,
        done: data.done,
        userId: req.id,
      },
    });
    return res.status(201).send(todo);
  } catch (error) {
    return res.status(500).send({ message: "Error creating todos." });
  }
}

export const updateTodoHandler = async (req: AuthRequest, res: Response) => {
  const { todoId } = req.params;
  const { done } = req.body;

  try {
    const updatedTodo = await updateTodo(Number(todoId), Boolean(done));
    return res.status(200).send(updatedTodo);
  } catch (error) {
    return res.status(500).send({ message: "Error updating todo." });
  }
};

export const deleteTodoHandler = async (req: AuthRequest, res: Response) => {
  const { todoId } = req.params;

  try {
    await deleteTodo(Number(todoId));
    return res.status(200).send({ message: "Todo deleted successfully." });
  } catch (error) {
    return res.status(500).send({ message: "Error deleting todo." });
  }
};

async function updateTodo(todoId: number, done: boolean) {
  try {
    const res = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        done: done,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw new Error("Error updating todo");
  }
}

async function deleteTodo(todoId: number) {
  try {
    const res = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("Error deleting todo");
  }
}