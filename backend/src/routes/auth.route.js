import { Router } from 'express';
const router = Router();
import { login, register, getProfile } from '../controllers/auth.controller.js';
import { validateLogin, validateRegister } from '../middlewares/validate.middleware.js';

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.get('/profile/:id',  getProfile);

export default router;