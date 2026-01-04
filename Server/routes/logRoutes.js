import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import {
    createLog,
    getLogs,
    getLogById,
    updateLog,
    deleteLog
} from '../controllers/logController.js';

const router = express.Router();

// All log routes are protected
router.use(authenticateUser);

router.post('/', createLog);
router.get('/', getLogs);
router.get('/:id', getLogById);
router.put('/:id', updateLog);
router.delete('/:id', deleteLog);

export default router;
