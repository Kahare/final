import express from 'express';
import { addPoll, listPolls, voteInPoll } from '../controllers/PollController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/polls', authenticateToken, authorizeRole(['Admin', 'Government Official']), addPoll);
router.get('/polls', authenticateToken, listPolls);
router.post('/polls/vote', authenticateToken, voteInPoll);

export default router;
