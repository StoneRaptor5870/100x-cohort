import { configDotenv } from "dotenv";
import express from "express";
import morgan from 'morgan';
import { surveyRouter } from "./routes/surveyRoutes";

const app = express();
configDotenv();

app.use(express.json());

app.use(morgan('combined'));
app.use("/api/surveys", surveyRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello from backend</h1>");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});