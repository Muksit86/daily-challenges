import express from 'express';
import {
    registerPlayerId,
    unregisterPlayerId,
    sendTestNotification,
    sendNotificationToUser,
} from '../controllers/notificationController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateUser);

// Register user's OneSignal Player ID
router.post('/register', registerPlayerId);

// Unregister user's OneSignal Player ID  
router.delete('/unregister', unregisterPlayerId);

// Send test notification to current user
router.post('/test', sendTestNotification);

// Send notification to specific user (you may want to add admin middleware here)
router.post('/send', sendNotificationToUser);

export default router;
