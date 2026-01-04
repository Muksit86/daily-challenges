import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import {
    signup,
    login,
    logout,
    deleteAccount,
    verifySession
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.delete('/delete-account', authenticateUser, deleteAccount);
router.post('/verify', authenticateUser, verifySession);

export default router;
