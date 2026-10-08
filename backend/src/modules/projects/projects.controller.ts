import { Response, NextFunction } from 'express';
import prisma from '../../utils/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';

export const getProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const { search, status } = req.query;

    const whereClause: any = { user_id: userId };
    if (status) whereClause.status = status;
    if (search) {
      whereClause.name = { contains: search as string, mode: 'insensitive' };
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        _count: { select: { tasks: true } }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({ success: true, data: projects });
  } catch (error) { next(error); }
};

export const getProjectById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findFirst({
      where: { id, user_id: req.user!.userId }
    });
    if (!project) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
    res.json({ success: true, data: project });
  } catch (error) { next(error); }
};

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, status, startDate, endDate } = req.body;
    const project = await prisma.project.create({
      data: {
        user_id: req.user!.userId,
        name,
        description,
        status: status || 'NOT_STARTED',
        start_date: startDate ? new Date(startDate) : null,
        end_date: endDate ? new Date(endDate) : null
      }
    });
    res.status(201).json({ success: true, data: project });
  } catch (error) { next(error); }
};

export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findFirst({ where: { id, user_id: req.user!.userId } });
    if (!project) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });

    const { name, description, status, startDate, endDate } = req.body;
    const updated = await prisma.project.update({
      where: { id },
      data: {
        name, description, status,
        start_date: startDate ? new Date(startDate) : undefined,
        end_date: endDate ? new Date(endDate) : undefined
      }
    });
    res.json({ success: true, data: updated });
  } catch (error) { next(error); }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const project = await prisma.project.findFirst({ where: { id, user_id: req.user!.userId } });
    if (!project) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });

    await prisma.project.delete({ where: { id } });
    res.json({ success: true, data: {} });
  } catch (error) { next(error); }
};
