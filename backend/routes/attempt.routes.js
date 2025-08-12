import express from "express";
<<<<<<< HEAD
import { submitAttempt, getAttemptsByQuiz } from "../controllers/attempt.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// submit attempt - protected for logged in users; you can allow anonymous by removing protect
router.post("/", protect, submitAttempt);

// admin-only analytics for a quiz
router.get("/quiz/:quizId", protect, authorizeRoles("admin"), getAttemptsByQuiz);
=======
import { submitAttempt, getAllAttempts } from "../controllers/attempt.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/", submitAttempt);
router.get("/", protect, authorizeRoles("admin"), getAllAttempts);
>>>>>>> 7ce973d7002e691fca38ed6f11f346a0a40c3d96

export default router;
