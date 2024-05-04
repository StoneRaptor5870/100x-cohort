require("dotenv").config();
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>Hello from wallet backend</h1>");
});

mongoose.connect(process.env.DATABASE as string).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Could not connect to MongoDB!", err);
});

app.listen(port, () => {
  console.log(`connected to ${port} - http://localhost:${port}`);
});