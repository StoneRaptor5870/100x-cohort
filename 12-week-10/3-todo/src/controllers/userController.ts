import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  username: z.string().email(),
  password: z.string().min(6),
});
const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, username, password } = req.body;
  if (!username || !password || !firstName) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  try {
    const { success } = signupSchema.safeParse(req.body);
    
  } catch (error) {
    return res.status(500).send({ message: "Error signing up!", error: error });
  }
}