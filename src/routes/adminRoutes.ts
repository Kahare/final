import { Router } from 'express';
import { addUser, approveUser } from '../controllers/adminController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
import { addDocument } from '../controllers/DocumentController';
import { addIncidence } from '../controllers/IncidenceController';
import { addPoll } from '../controllers/PollController';
import { addView } from '../controllers/ViewController';

const router = Router();

var multer = require('multer');
export var forms = multer();
router.use(forms.array());

router.post('/add-user', authenticateToken, authorizeRole(['Admin']), addUser);
router.post('/approve-user', authenticateToken, authorizeRole(['Admin']), approveUser);

// Poll routes
// router.post('/polls', authenticateToken, authorizeRole(['Admin', 'Government Official']), addPoll);
// Add routes for read, update, delete, and record results

// View routes
// router.post('/views', authenticateToken, authorizeRole(['Admin', 'Government Official']), addView);
// Add routes for read, update, and delete

// Incidence routes
// router.post('/incidences', authenticateToken, authorizeRole(['Admin', 'Government Official']), addIncidence);
// Add routes for read, update, and delete

// Document routes
// router.post('/documents', authenticateToken, authorizeRole(['Admin', 'Government Official']), addDocument);
// Add routes for read, update, and delete

export default router;
