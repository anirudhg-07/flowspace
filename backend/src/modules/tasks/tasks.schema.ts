import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    projectId: z.string().uuid(),
    name: z.string().min(1, 'Task name is required'),
    description: z.string().optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
    dueDate: z.string().optional()
  })
});

export const updateTaskSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
    dueDate: z.string().optional()
  }),
  params: z.object({ id: z.string().uuid() })
});
