import { prisma } from "../index";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
  const res = await prisma.user.create({
    data: {
      username,
      password,
      name
    },
  });
  console.log(res);
}

// createUser("nv@gmail.com", "sasaa", "nischay");

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  console.log(user);
}

// getUser(1);
