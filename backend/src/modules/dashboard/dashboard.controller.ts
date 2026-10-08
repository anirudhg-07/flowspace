import { Response, NextFunction } from 'express';
import prisma from '../../utils/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';

export const getDashboardStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;

    const [
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      projectsInProgress,
      upcomingTasks,
      recentProjects,
      upcomingDeadlines,
    ] = await Promise.all([
      prisma.project.count({ where: { user_id: userId } }),
      prisma.task.count({ where: { user_id: userId } }),
      prisma.task.count({ where: { user_id: userId, status: 'COMPLETED' } }),
      prisma.task.count({ where: { user_id: userId, status: 'PENDING' } }),
      prisma.task.count({ where: { user_id: userId, status: 'IN_PROGRESS' } }),
      prisma.project.count({ where: { user_id: userId, status: 'IN_PROGRESS' } }),

      // Upcoming tasks — not completed, sorted by due date
      prisma.task.findMany({
        where: {
          user_id: userId,
          status: { not: 'COMPLETED' },
        },
        include: { project: { select: { name: true } } },
        orderBy: [{ due_date: 'asc' }, { created_at: 'desc' }],
        take: 5,
      }),

      // Recent projects — most recently created
      prisma.project.findMany({
        where: { user_id: userId },
        include: {
          _count: { select: { tasks: true } },
          tasks: { select: { status: true } },
        },
        orderBy: { created_at: 'desc' },
        take: 4,
      }),

      // Upcoming deadlines — tasks with due dates in the future
      prisma.task.findMany({
        where: {
          user_id: userId,
          status: { not: 'COMPLETED' },
          due_date: { gte: new Date() },
        },
        include: { project: { select: { name: true } } },
        orderBy: { due_date: 'asc' },
        take: 5,
      }),
    ]);

    // Compute project progress percentages
    const recentProjectsWithProgress = recentProjects.map((p) => {
      const total = p.tasks.length;
      const completed = p.tasks.filter((t) => t.status === 'COMPLETED').length;
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      return {
        id: p.id,
        name: p.name,
        description: p.description,
        status: p.status,
        start_date: p.start_date,
        end_date: p.end_date,
        created_at: p.created_at,
        taskCount: p._count.tasks,
        progress,
      };
    });

    const overallPercentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.json({
      success: true,
      data: {
        stats: {
          totalProjects,
          totalTasks,
          completedTasks,
          pendingTasks,
          projectsInProgress,
        },
        projectProgress: {
          completed: completedTasks,
          inProgress: inProgressTasks,
          pending: pendingTasks,
          percentage: overallPercentage,
        },
        upcomingTasks,
        recentProjects: recentProjectsWithProgress,
        upcomingDeadlines,
      },
    });
  } catch (error) {
    next(error);
  }
};
