import express from "express";
import { login, register, getAllUsers } from "../controllers/auth.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);

export default router;
