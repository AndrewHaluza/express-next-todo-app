import Joi from "joi";

import { TaskStatus } from "./task.type";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).max(1500).required(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).optional(),
  description: Joi.string().trim().min(1).max(1500).optional(),
  status: Joi.string<TaskStatus>()
    .valid("todo", "in-progress", "done", "postponed", "archived")
    .optional(),
});

export const idParamsSchema = Joi.object({
  id: Joi.number().required(),
});
