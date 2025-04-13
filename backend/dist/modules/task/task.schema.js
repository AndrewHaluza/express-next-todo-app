import Joi from "joi";
import { PAGINATION } from "../../shared/constants/pagination";
export var createTaskSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).max(1500).required(),
});
export var updateTaskSchema = Joi.object({
    title: Joi.string().trim().min(1).max(255).optional(),
    description: Joi.string().trim().min(1).max(1500).optional(),
    status: Joi.string()
        .valid("todo", "in-progress", "done", "postponed", "archived")
        .optional(),
});
export var idParamsSchema = Joi.object({
    id: Joi.number().required(),
});
export var paginationQueryParamsSchema = Joi.object({
    page: Joi.number()
        .min(PAGINATION.MIN_PAGE)
        .max(PAGINATION.MAX_PAGE)
        .default(PAGINATION.DEFAULT_PAGE)
        .required(),
    limit: Joi.number()
        .min(PAGINATION.MIN_PAGE_SIZE)
        .max(PAGINATION.MAX_PAGE_SIZE)
        .default(PAGINATION.DEFAULT_PAGE_SIZE)
        .required(),
});
