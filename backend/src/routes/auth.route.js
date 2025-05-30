import { Router } from 'express';
const router = Router();
import { login, register, logout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateLogin, validateRegister } from '../middlewares/validate.middleware.js';

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/logout', authMiddleware, logout);


export default router;