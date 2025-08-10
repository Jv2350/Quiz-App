import express from "express";
import {
  getAllQuizzes,
  getQuizbyId,
  createQuiz,
} from "../controllers/quiz.controller.js";

const router = express.Router();
router.get("/", getAllQuizzes);
router.get("/:id", getQuizbyId);
router.post("/", createQuiz);

export default router;
