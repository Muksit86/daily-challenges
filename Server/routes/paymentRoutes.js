import express from 'express';
import { createOrder, verifyPayment, handleWebhook } from '../controllers/paymentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/create-order', authMiddleware, createOrder);
router.post('/verify', authMiddleware, verifyPayment);

// Webhook route (no auth - verified by Razorpay signature)
router.post('/webhook', handleWebhook);

export default router;
