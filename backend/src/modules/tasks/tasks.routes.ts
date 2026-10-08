import { Router } from 'express';
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from './tasks.controller';
import { requireAuth } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { createTaskSchema, updateTaskSchema } from './tasks.schema';

const router = Router();
router.use(requireAuth);

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', validateRequest(createTaskSchema), createTask);
router.put('/:id', validateRequest(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;
