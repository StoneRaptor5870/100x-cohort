import { PrismaClient } from "@prisma/client";
import { createUser, getUser } from "../user";
import { createTodo, updateTodo, getTodos } from "../todo";
import { dropTables } from "../setup";

const prisma = new PrismaClient();

interface Todo {
  id: number;
  title: string;
  description: string | null;
  done: boolean;
  userId: number;
}

beforeAll(async () => {
  await dropTables();
}, 10000);

afterAll(async () => {});

describe("User Database Operations", () => {
  test("createUser inserts a new user into the database", async () => {
    const username = "testuser";
    const password = "testpass";
    const name = "Test User";

    const user = await createUser(username, password, name);

    expect(user).toHaveProperty("username", username);
    expect(user).toHaveProperty("name", name);
  }, 10000);

  test("getUser retrieves a user by ID", async () => {
    const newUser = await createUser("newuser", "password", "New User");
    const user = await getUser(newUser.id);

    expect(user).toHaveProperty("id", newUser.id);
    expect(user).toHaveProperty("username", "newuser");
    expect(user).toHaveProperty("name", "New User");
  }, 10000);
});

describe("Todo Operations", () => {
  let userId: number;

  beforeAll(async () => {
    const user = await createUser("todouser", "password", "Todo User");
    userId = user.id;
  }, 10000);

  test("createTodo inserts a new todo for a user", async () => {
    const title = "Test Todo";
    const description = "Test Description";
    const todo = await createTodo(userId, title, description);

    expect(todo).toHaveProperty("title", title);
    expect(todo).toHaveProperty("description", description);
    expect(todo).toHaveProperty("done", false);
  }, 10000);

  test("updateTodo marks a todo as done", async () => {
    const todo = await createTodo(userId, "Update Test", "To be updated");
    const updatedTodo = await updateTodo(todo.id, true);

    expect(updatedTodo).toHaveProperty("done", true);
  }, 10000);

  test("getTodos retrieves all todos for a user", async () => {
    await createTodo(userId, "Another Todo", "Another description");
    const todos = await getTodos(userId);

    expect(todos.length).toBeGreaterThan(0);
    todos.forEach((todo: Todo) => {
      expect(todo).toHaveProperty("userId", userId);
    });
  }, 10000);
});
