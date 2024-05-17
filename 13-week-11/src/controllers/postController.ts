import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { StatusCode } from "./userController";

export const getPosts = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const response = await prisma.posts.findMany({
      include: {
        tags: true,
        User: true,
      },
    });

    return c.json(
      {
        post: response.map((res) => ({
          id: res.id,
          username: res.User.username,
          userId: res.User.id,
          title: res.title,
          body: res.body,
          tags: res.tags,
          createdAt: res.createdAt,
        })),
      },
      StatusCode.OK
    );
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
};

export const getUserPosts = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const response = await prisma.posts.findMany({
      where: {
        userId: c.get("userId"),
      },
    });

    return c.json(
      {
        posts: response,
      },
      StatusCode.OK
    );
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
};

export const createPost = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const body: { title: string; body: string; tags: string } =
      await c.req.json();

    const tagNames = body.tags.split(",").map((tag) => tag.trim());

    if ((body.body && body.title) == null) {
      return c.body("Invalid user input", StatusCode.BADREQUEST);
    }

    const res = await prisma.posts.create({
      data: {
        title: body.title,
        body: body.body,
        userId: c.get("userId"),
        tags: {
          connectOrCreate: tagNames.map((tag) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return c.json(
      {
        message: "Post created successfully",
        post: {
          id: res.id,
          title: res.title,
          body: res.body,
          tags: res.tags.map((tag) => tag.tag),
          createdAt: res.createdAt,
        },
      },
      StatusCode.CREATED
    );
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
};

export const getPost = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const id: number = Number(c.req.param("id"));

    const isPostExist = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.get("userId"),
      },
      include: {
        tags: true,
      },
    });

    if (isPostExist == null) {
      return c.body("Post does not exists", StatusCode.NOTFOUND);
    }
    return c.json(
      {
        data: {
          id: isPostExist.id,
          title: isPostExist.title,
          body: isPostExist.body,
          tags: isPostExist.tags,
          createdAt: isPostExist.createdAt,
        },
      },
      StatusCode.OK
    );
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
};

export const updatePost = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const id: number = Number(c.req.param("id"));

    const body: {
      title: string;
      body: string;
      tags: string;
    } = await c.req.json();

    const tagNames = body.tags.split(',').map((tag) => tag.trim());

    const isPostExist = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.get('userId'),
      },
    });

    if (isPostExist == null) {
      return c.body('Post does not exists', StatusCode.NOTFOUND);
    }

    const res = await prisma.posts.update({
      where: {
        id: id,
        userId: c.get('userId'),
      },
      data: {
        title: body.title,
        body: body.body,
        tags: {
          connectOrCreate: tagNames.map((tag) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return c.json({
      data: {
        id: res.id,
        title: res.title,
        body: res.body,
        tags: res.tags,
        createdAt: res.createdAt,
      },
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
};

export const deletePost = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const id: number = Number(c.req.param("id"));

    const isPostExist = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.get("userId"),
      },
    });

    if (isPostExist == null) {
      return c.body("Post does not exists", StatusCode.NOTFOUND);
    }

    const res = await prisma.posts.delete({
      where: {
        id: id,
        userId: c.get("userId"),
      },
    });
    return c.json(
      {
        message: "post deleted successfully!",
      },
      StatusCode.OK
    );
  } catch (error) {
    return c.body(
      `Internal server error: ${error}`,
      StatusCode.INTERNALSERVERERROR
    );
  } finally {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  }
};
