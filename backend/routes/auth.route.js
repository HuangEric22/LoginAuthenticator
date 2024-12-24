import express from "express";
import { signup, login, logout, verifyEmail} from "../controllers/auth.controller.js";

const router = express.Router();

// routes to handle account creation and access
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// verifcation routes
router.post("/verify-email", verifyEmail);



export default router;