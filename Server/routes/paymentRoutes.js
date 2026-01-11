import express from "express";
import {
  createOrder,
  verifyPayment,
  handleWebhook,
} from "../controllers/paymentController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes (require authentication)
router.post("/create-order", authenticateUser, createOrder);
router.post("/verify", authenticateUser, verifyPayment);

// Webhook route (no auth - verified by Razorpay signature)
router.post("/webhook", handleWebhook);

export default router;
