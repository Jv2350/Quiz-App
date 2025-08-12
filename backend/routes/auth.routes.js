import express from "express";
<<<<<<< HEAD
import { login, register } from "../controllers/auth.controller.js";
=======
import { login, register, getAllUsers } from "../controllers/auth.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

>>>>>>> 7ce973d7002e691fca38ed6f11f346a0a40c3d96
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);

export default router;
