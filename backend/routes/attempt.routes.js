import express from "express";
import { submitAttempt } from "../controllers/attempt.Controller.js";

const router = express.Router();
router.post("/", submitAttempt);

export default router;
