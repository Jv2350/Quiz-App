import express from "express";
import { submitAttempt, getAllAttempts } from "../controllers/attempt.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/", submitAttempt);
router.get("/", protect, authorizeRoles("admin"), getAllAttempts);

export default router;
