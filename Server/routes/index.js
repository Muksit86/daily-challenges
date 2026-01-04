import express from 'express';
import authRoutes from './authRoutes.js';
import challengeRoutes from './challengeRoutes.js';
import logRoutes from './logRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/challenges', challengeRoutes);
router.use('/logs', logRoutes);

export default router;
