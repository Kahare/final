import express from 'express';
import { addIncidence, listIncidences, updateExistingIncidence, removeIncidence } from '../controllers/IncidenceController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/incidences', authenticateToken, authorizeRole(['Admin', 'Government Official']), upload.single('image'), addIncidence);
router.get('/incidences', authenticateToken, listIncidences);
router.put('/incidences/:id', authenticateToken, authorizeRole(['Admin', 'Government Official']), upload.single('image'), updateExistingIncidence);
router.delete('/incidences/:id', authenticateToken, authorizeRole(['Admin', 'Government Official']), removeIncidence);

export default router;
