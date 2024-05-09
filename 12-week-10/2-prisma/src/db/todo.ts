import { prisma } from "../index";

/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId,
    },
  });
  console.log(todo);
  return todo;
}

// createTodo(1, "go to gym", "go to gym and do 10 pushups");

/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */

export async function updateTodo(todoId: number, done: boolean) {
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
}

// updateTodo(1, true);

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(todos);
  return todos;
}

// getTodos(1);