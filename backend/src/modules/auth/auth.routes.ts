import { Router } from 'express';
import { register, login, logout, me } from './auth.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { registerSchema, loginSchema } from './auth.schema';
import { requireAuth } from '../../middleware/auth.middleware';
import { authLimiter } from '../../middleware/rate-limit.middleware';

const router = Router();

router.post('/register', authLimiter, validateRequest(registerSchema), register);
router.post('/login', authLimiter, validateRequest(loginSchema), login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, me);

export default router;
