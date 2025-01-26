import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

// POST: Register a new user
router.post("/register", register);

// POST: Login a user
router.post("/login", login);

export default router;
