import { Router } from 'express';
const router = Router();
import { login, register, logout } from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateLogin, validateRegister } from '../middleware/validate.middleware.js';

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/logout', authMiddleware, logout);


export default router;