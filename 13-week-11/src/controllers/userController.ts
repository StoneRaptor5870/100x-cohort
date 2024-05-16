import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signinSchema, signupSchema } from '../zod/userValidation';
import { Jwt } from 'hono/utils/jwt';
import { Context } from 'hono';

enum StatusCode {
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
  } catch (error) {
    console.error('Database connection failed', error);
  }

  try {
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

    const res = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
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

export const signin = async () => {}

export const userProfile = async () => {}

export const getAllUsers = async () => {}