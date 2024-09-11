import { z } from "zod";


export const updateTaskValidation = {
  params: z.object({
    id: z.string(),
  }),

  body: z.object({
    title: z.string().min(3),
    description: z.string(),
    isCompleted: z.boolean(),
  }),
};

export const createTaskValidation = {
  body: z.object({
    title: z.string(),
    description: z.string(),
    columnId: z.string(),
    isCompleted : z.boolean(),
    subTasks : z.array(z.object({
        title : z.string(),
        isCompleted : z.boolean(),
    }))
  }),
};


