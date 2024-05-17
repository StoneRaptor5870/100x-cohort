import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signinSchema, signupSchema } from '../zod/userValidation';
import { Jwt } from 'hono/utils/jwt';
import { Context } from 'hono';
import bcrypt from 'bcryptjs';

export enum StatusCode {
  BADREQUEST = 400,
  NOTFOUND = 404,
  FORBIDDEN = 403,
  INTERNALSERVERERROR = 500,
  OK = 200,
  CREATED = 201
}

export const signup = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    const body: {
      username: string;
      email: string;
      password: string;
    } = await c.req.json();

    const parsedUser = signupSchema.safeParse(body);

    if (!parsedUser.success) {
      return c.body('Invalid user input', StatusCode.BADREQUEST);
    }

    const isUserExist = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (isUserExist) {
      return c.body('email already exist', StatusCode.BADREQUEST);
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const res = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
    });

    const userId = res.id;

    const token = await Jwt.sign(userId, c.env.JWT_TOKEN);

    return c.json({
      msg: 'User created successfully',
      token: token,
      user: {
        userId: res.id,
        username: res.username,
        email: res.email,
      },
    }, StatusCode.CREATED);
  } catch (error) {
    return c.body(`Internal server error: ${error}`, StatusCode.INTERNALSERVERERROR);
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
}

export const signin = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    const body: {email: string; password: string} = await c.req.json();
    const parsedUser = signinSchema.safeParse(body);

    if (!parsedUser.success) {
      return c.body('Invalid user input', StatusCode.BADREQUEST);
    }

    const isUserExist = await prisma.user.findFirst({
      where: {
        email: body.email
      },
    });

    if (isUserExist == null) {
      return c.body('User does not exists', StatusCode.BADREQUEST);
    }

    const isPasswordValid = await bcrypt.compare(body.password, isUserExist.password);

    if (!isPasswordValid) {
      return c.body('Invalid password', StatusCode.BADREQUEST);
    }

    const userId = isUserExist.id;

    const token = await Jwt.sign(userId, c.env.JWT_TOKEN);

    return c.json({
      message: 'login successfully',
      token: token,
      user: {
        userId: userId,
        username: isUserExist.username,
        email: isUserExist.email,
      },
    }, StatusCode.OK);
  } catch (error) {
    return c.body(`Internal server error: ${error}`, StatusCode.INTERNALSERVERERROR);
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
}

export const userProfile = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    const res = await prisma.user.findFirst({
      where: {
        id: Number(c.req.param('id')),
      },
      include: {
        posts: true,
      },
    });

    if (res == null) {
      return c.body('User not found', StatusCode.NOTFOUND);
    } else {
      return c.json({
        user: {
          id: res.id,
          username: res.username,
          email: res.email,
          posts: res.posts,
        },
      }, StatusCode.OK);
    }
  } catch (error) {
    return c.body(`Internal server error: ${error}`, StatusCode.INTERNALSERVERERROR);
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
}

export const getAllUsers = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    const res = await prisma.user.findMany();
    return c.json({
      users: res.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
      })),
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, StatusCode.INTERNALSERVERERROR);
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
};