import { client } from "../index";
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
  try {
    // await client.connect();
    // console.log("db connected");
  
    const insertQuery =
      "INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *;";
    const values = [userId, title, description];
    const res = await client.query(insertQuery, values);
    console.log("Insertion success:", res.rows[0]);
    return res.rows[0]; // Ensure you return the inserted todo.
  } catch (err) {
    console.error("Error during the insertion:", err);
    throw err;
  }
}

// createTodo(1, "work", "webd");

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
export async function updateTodo(todoId: number) {
  try {
    // await client.connect();
    // console.log("Database connected for updating todo.");

    const updateQuery = "UPDATE todos SET done = TRUE WHERE id = $1 RETURNING *;";
    const values = [todoId];
    const updateResult = await client.query(updateQuery, values);

    if (updateResult.rows.length === 0) {
      console.log("No todo found with the given ID:", todoId);
      return null;
    }

    console.log("Todo updated successfully:", updateResult.rows[0]);
    return updateResult.rows[0]; // Return the updated todo.
  } catch (err) {
    console.error("Error during the todo update:", err);
    throw err;
  }
}

// updateTodo(1);

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
  try {
    // await client.connect();
    // console.log("Database connected for retrieving todos.");

    const query = "SELECT id, title, description, done FROM todos WHERE user_id = $1;";
    const values = [userId];
    const result = await client.query(query, values);

    const todo = result.rows;
    console.log("Todos retrieved successfully for user ID:", todo);
    return todo;
  } catch (err) {
    console.error("Error during the retrieval of todos:", err);
    throw err;
  }
}

getTodos(1);