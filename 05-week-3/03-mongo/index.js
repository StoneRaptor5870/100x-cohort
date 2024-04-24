const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin.js");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/api/admin", adminRouter);
// app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.DB).then((data) => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});