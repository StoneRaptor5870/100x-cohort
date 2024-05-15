import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
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

    if (!success) {
      return res.status(400).send({ message: "Incorrect Inputs!" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(411).send({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    const jwtToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", jwtToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(201).send({
      msg: "User created successfully."
    });
  } catch (error) {
    return res.status(500).send({ message: "Error signing up!", error: error });
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }
  try {
    const { success } = loginSchema.safeParse(req.body);

    if (!success) {
      return res.status(411).send({ message: "Incorrect Inputs!" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!existingUser) {
      return res.status(400).send({ message: "User not found" });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatched) {
      return res.status(400).send({ message: "wrong password" });
    }

    const jwtToken = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", jwtToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).send({
      msg: "logged in successfuly."
    });
  } catch (error) {
    return res.status(500).send({ message: "Error log in!", error: error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({ message: "logged out successfully!" });
  } catch (error) {
    return res.status(500).send({ message: "Error logging out!", error });
  }
};