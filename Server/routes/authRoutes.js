import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import {
    sendMagicLink,
    verifyOtp,
    logout,
    deleteAccount,
    getCurrentUser
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/send-magic-link', sendMagicLink);
router.post('/verify-otp', verifyOtp);
router.post('/logout', logout);

// Protected routes
router.delete('/delete-account', authenticateUser, deleteAccount);
router.get('/me', authenticateUser, getCurrentUser);

export default router;
