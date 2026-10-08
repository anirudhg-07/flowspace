import { Router } from 'express';
import { getDashboardStats } from './dashboard.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);
router.get('/', getDashboardStats);

export default router;
