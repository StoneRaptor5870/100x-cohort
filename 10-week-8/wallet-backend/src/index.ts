require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import { mainRouter } from "./routes/mainRouter";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));

const port = process.env.PORT || 5000;

app.use("/api/v1", mainRouter);

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