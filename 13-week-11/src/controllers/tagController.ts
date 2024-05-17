import { Context } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { StatusCode } from './userController';

export const getPostsByTag = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const res = await prisma.tags.findMany({
      where: {
        tag: String(c.req.param('tag')),
      },
      select: {
        post: {
          select: {
            User: { select: { username: true } },
            id: true,
            userId: true,
            title: true,
            body: true,
            createdAt: true,
          },
        },
      },
    });

    return c.json({
      posts: res[0].post.map((post) => ({
        username: post.User.username,
        id: post.id,
        title: post.title,
        userId: post.userId,
        body: post.body,
        createdAt: post.createdAt,
      })),
    }, StatusCode.OK);
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
}

export const getTags = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const res = await prisma.tags.findMany();

    return c.json({
      tags: res,
    }, StatusCode.OK);
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
}