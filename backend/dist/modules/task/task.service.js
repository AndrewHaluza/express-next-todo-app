"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_model_1 = require("./task.model");
class TaskService {
    getAllTasks() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const offset = (page - 1) * limit;
            const [totalItems, tasks] = yield Promise.all([
                task_model_1.TaskModel.count(),
                task_model_1.TaskModel.findAll({
                    limit,
                    offset,
                    order: [["id", "ASC"]],
                }),
            ]);
            const totalPages = Math.ceil(totalItems / limit);
            return {
                data: tasks,
                meta: {
                    pagination: { page, limit, totalPages, totalItems },
                },
            };
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return task_model_1.TaskModel.findOne({ where: { id } });
        });
    }
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            return task_model_1.TaskModel.create(taskData);
        });
    }
    updateTask(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            return task_model_1.TaskModel.update(taskData, { where: { id } });
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return task_model_1.TaskModel.destroy({ where: { id } });
        });
    }
}
exports.TaskService = TaskService;
