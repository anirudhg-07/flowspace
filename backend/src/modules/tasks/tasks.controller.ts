import { Response, NextFunction } from 'express';
import prisma from '../../utils/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { search, status, priority, projectId } = req.query;
    const whereClause: any = { user_id: req.user!.userId };

    if (status) whereClause.status = status;
    if (priority) whereClause.priority = priority;
    if (projectId) whereClause.project_id = projectId;
    if (search) whereClause.name = { contains: search as string, mode: 'insensitive' };

    const tasks = await prisma.task.findMany({
      where: whereClause,
      include: { project: { select: { name: true } } },
      orderBy: { created_at: 'desc' }
    });
    res.json({ success: true, data: tasks });
  } catch (error) { next(error); }
};

export const getTaskById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const task = await prisma.task.findFirst({ where: { id: req.params.id, user_id: req.user!.userId } });
    if (!task) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found' } });
    res.json({ success: true, data: task });
  } catch (error) { next(error); }
};

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { projectId, name, description, priority, status, dueDate } = req.body;
    
    // Verify project belongs to user
    const project = await prisma.project.findFirst({ where: { id: projectId, user_id: req.user!.userId } });
    if (!project) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found or unauthorized' } });

    const task = await prisma.task.create({
      data: {
        project_id: projectId,
        user_id: req.user!.userId,
        name, description,
        priority: priority || 'MEDIUM',
        status: status || 'PENDING',
        due_date: dueDate ? new Date(dueDate) : null
      }
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) { next(error); }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findFirst({ where: { id, user_id: req.user!.userId } });
    if (!task) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found' } });

    const { name, description, priority, status, dueDate } = req.body;
    const updated = await prisma.task.update({
      where: { id },
      data: {
        name, description, priority, status,
        due_date: dueDate ? new Date(dueDate) : undefined
      }
    });
    res.json({ success: true, data: updated });
  } catch (error) { next(error); }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findFirst({ where: { id, user_id: req.user!.userId } });
    if (!task) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Task not found' } });

    await prisma.task.delete({ where: { id } });
    res.json({ success: true, data: {} });
  } catch (error) { next(error); }
};
