import express from 'express';
import { addDocument, listDocuments, getDocument, updateExistingDocument, removeDocument } from '../controllers/DocumentController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/documents', authenticateToken, authorizeRole(['Admin', 'Government Official']), upload.single('document'), addDocument);
router.get('/documents', authenticateToken, listDocuments);
router.get('/documents/:id', authenticateToken, getDocument);
router.put('/documents/:id', authenticateToken, authorizeRole(['Admin', 'Government Official']), upload.single('document'), updateExistingDocument);
router.delete('/documents/:id', authenticateToken, authorizeRole(['Admin', 'Government Official']), removeDocument);

export default router;
