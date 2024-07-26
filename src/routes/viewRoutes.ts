import express from 'express';
import { addView, listViews, updateExistingView, removeView } from '../controllers/ViewController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/views', authenticateToken, authorizeRole(['Admin', 'Government Official']), upload.single('image'), addView);
router.get('/views', authenticateToken, listViews);
router.put('/views/:id', authenticateToken, authorizeRole(['Admin', 'Government Official']), upload.single('image'), updateExistingView);
router.delete('/views/:id', authenticateToken, authorizeRole(['Admin', 'Government Official']), removeView);

export default router;
