import { Response, NextFunction } from 'express';
import prisma from '../../utils/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';

export const getDashboardStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;

    const [totalProjects, totalTasks, completedTasks, pendingTasks, projectsInProgress] = await Promise.all([
      prisma.project.count({ where: { user_id: userId } }),
      prisma.task.count({ where: { user_id: userId } }),
      prisma.task.count({ where: { user_id: userId, status: 'COMPLETED' } }),
      prisma.task.count({ where: { user_id: userId, status: 'PENDING' } }),
      prisma.project.count({ where: { user_id: userId, status: 'IN_PROGRESS' } })
    ]);

    res.json({
      success: true,
      data: {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        projectsInProgress
      }
    });
  } catch (error) {
    next(error);
  }
};
