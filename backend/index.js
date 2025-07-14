import express from "express";
import connectDB from "./config/db.js";
import quizRoute from "./routes/quiz.routes.js";

import dotenv from "dotenv/config";
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("API running ✅");
});
app.use("/api/quizzes", quizRoute);
