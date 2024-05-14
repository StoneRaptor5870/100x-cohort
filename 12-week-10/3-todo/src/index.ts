import { configDotenv } from "dotenv";
import express from "express";

const app = express();
configDotenv();

app.get("/", (req, res) => {
  res.send("<h1>Hello from backend</h1>");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
