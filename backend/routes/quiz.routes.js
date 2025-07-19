import express from "express";
import { getAllQuizzes, getQuizbyId } from "../controllers/quiz.controller.js";

const router = express.Router();
router.get("/", getAllQuizzes);
router.get("/:id", getQuizbyId);

export default router;
