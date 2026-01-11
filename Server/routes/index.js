import express from 'express';
import authRoutes from './authRoutes.js';
import challengeRoutes from './challengeRoutes.js';
import logRoutes from './logRoutes.js';
import paymentRoutes from './paymentRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/challenges', challengeRoutes);
router.use('/logs', logRoutes);
router.use('/payment', paymentRoutes);

export default router;
