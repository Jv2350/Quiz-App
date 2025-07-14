import express from "express";
import { getAllQuizzes, getQuizbyId } from "../controllers/quiz.controller.js";

const route = express.Router();
route.get("/", getAllQuizzes);
route.get("/:id", getQuizbyId);

export default route;
