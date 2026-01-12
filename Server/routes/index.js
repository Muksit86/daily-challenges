import express from 'express';
import authRoutes from './authRoutes.js';
import challengeRoutes from './challengeRoutes.js';
import logRoutes from './logRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import notificationRoutes from './notificationRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/challenges', challengeRoutes);
router.use('/logs', logRoutes);
router.use('/payment', paymentRoutes);
router.use('/notifications', notificationRoutes);

export default router;
