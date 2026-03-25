const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tasks", taskRoutes);

app.get("/", function (req, res) {
  res.json({ message: "Task Management API is running" });
});
app.use(function (req, res) {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(function () {
  app.listen(PORT, function () {
    console.log("Server is running on port " + PORT);
  });
});
