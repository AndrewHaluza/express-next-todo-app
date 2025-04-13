"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationQueryParamsSchema = exports.idParamsSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const pagination_1 = require("../../shared/constants/pagination");
exports.createTaskSchema = joi_1.default.object({
    title: joi_1.default.string().min(1).max(255).required(),
    description: joi_1.default.string().min(1).max(1500).required(),
});
exports.updateTaskSchema = joi_1.default.object({
    title: joi_1.default.string().trim().min(1).max(255).optional(),
    description: joi_1.default.string().trim().min(1).max(1500).optional(),
    status: joi_1.default.string()
        .valid("todo", "in-progress", "done", "postponed", "archived")
        .optional(),
});
exports.idParamsSchema = joi_1.default.object({
    id: joi_1.default.number().required(),
});
exports.paginationQueryParamsSchema = joi_1.default.object({
    page: joi_1.default.number()
        .min(pagination_1.PAGINATION.MIN_PAGE)
        .max(pagination_1.PAGINATION.MAX_PAGE)
        .default(pagination_1.PAGINATION.DEFAULT_PAGE)
        .required(),
    limit: joi_1.default.number()
        .min(pagination_1.PAGINATION.MIN_PAGE_SIZE)
        .max(pagination_1.PAGINATION.MAX_PAGE_SIZE)
        .default(pagination_1.PAGINATION.DEFAULT_PAGE_SIZE)
        .required(),
});
