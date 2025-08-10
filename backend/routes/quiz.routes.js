import express from "express";
import {
  getAllQuizzes,
  getQuizbyId,
  createQuiz,
  deleteQuiz,
  updateQuiz
} from "../controllers/quiz.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", getAllQuizzes);
router.get("/:id", getQuizbyId);
router.post("/", protect, authorizeRoles("admin"), createQuiz);
router.put("/:id", protect, authorizeRoles("admin"), updateQuiz);
router.delete("/:id", protect, authorizeRoles("admin"), deleteQuiz);

export default router;
