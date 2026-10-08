import { Router } from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from './projects.controller';
import { requireAuth } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { createProjectSchema, updateProjectSchema } from './projects.schema';

const router = Router();
router.use(requireAuth);

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', validateRequest(createProjectSchema), createProject);
router.put('/:id', validateRequest(updateProjectSchema), updateProject);
router.delete('/:id', deleteProject);

export default router;
