import express from "express";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
<<<<<<< HEAD
  updateQuiz,
  deleteQuiz,
=======
  deleteQuiz,
  updateQuiz
>>>>>>> 7ce973d7002e691fca38ed6f11f346a0a40c3d96
} from "../controllers/quiz.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllQuizzes);
<<<<<<< HEAD
router.get("/:id", getQuizById);

// Admin only (or creator) routes
=======
router.get("/:id", getQuizbyId);
>>>>>>> 7ce973d7002e691fca38ed6f11f346a0a40c3d96
router.post("/", protect, authorizeRoles("admin"), createQuiz);
router.put("/:id", protect, authorizeRoles("admin"), updateQuiz);
router.delete("/:id", protect, authorizeRoles("admin"), deleteQuiz);

export default router;
