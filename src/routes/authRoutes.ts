import { Router } from 'express';
import { register, login, forgotPassword, resetPasswordHandler } from '../controllers/authcontroller';

const router = Router();

var multer = require('multer');
export var forms = multer();
router.use(forms.array());

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPasswordHandler);

export default router;
