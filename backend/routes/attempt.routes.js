import express from "express";
import { submitAttempt, getAttemptsByQuiz } from "../controllers/attempt.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// submit attempt - protected for logged in users; you can allow anonymous by removing protect
router.post("/", protect, submitAttempt);

// admin-only analytics for a quiz
router.get("/quiz/:quizId", protect, authorizeRoles("admin"), getAttemptsByQuiz);

export default router;
