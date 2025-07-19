import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import quizRoutes from "./routes/quiz.routes.js";
import attempRoutes from "./routes/attempt.routes.js";
import dotenv from "dotenv/config";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API running ✅");
});
app.use("/api/quizzes", quizRoutes);

app.use("/api/attempt", attempRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`);
});
