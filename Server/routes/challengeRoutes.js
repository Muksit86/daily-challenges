import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import {
    createChallenge,
    getChallenges,
    getChallengeById,
    updateChallenge,
    deleteChallenge
} from '../controllers/challengeController.js';

const router = express.Router();

// All challenge routes are protected
router.use(authenticateUser);

router.post('/', createChallenge);
router.get('/', getChallenges);
router.get('/:id', getChallengeById);
router.put('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);

export default router;
