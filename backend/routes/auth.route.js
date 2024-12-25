import express from "express";
import { signup, login, logout, verifyEmail, forgotPassword } from "../controllers/auth.controller.js";

const router = express.Router();

// routes to handle account creation and access
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// verifcation routes
router.post("/verify-email", verifyEmail);

// reset password routes
router.post("/forgot-password", forgotPassword);


export default router;