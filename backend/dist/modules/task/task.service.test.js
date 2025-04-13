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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const task_service_1 = require("./task.service");
const task_model_1 = require("./task.model");
(0, node_test_1.describe)("TaskService", () => {
    (0, node_test_1.it)("getAllTasks should return paginated tasks with correct metadata", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const taskService = new task_service_1.TaskService();
        const mockRes = {
            data: [
                { id: 1, title: "Task 1" },
                { id: 2, title: "Task 2" },
            ],
            meta: {
                pagination: { page: 1, limit: 2, totalPages: 10, totalItems: 20 },
            },
        };
        node_test_1.mock
            .method(task_model_1.TaskModel, "findAll")
            .mock.mockImplementationOnce(function (query) {
            return __awaiter(this, void 0, void 0, function* () {
                node_assert_1.default.deepStrictEqual(query, {
                    limit: 2,
                    offset: 0,
                    order: [["id", "ASC"]],
                });
                return mockRes.data;
            });
        });
        node_test_1.mock
            .method(task_model_1.TaskModel, "count")
            .mock.mockImplementationOnce(function () {
            return __awaiter(this, void 0, void 0, function* () {
                return mockRes.meta.pagination.totalItems;
            });
        });
        const result = yield taskService.getAllTasks(1, 2);
        node_assert_1.default.deepStrictEqual(result, {
            data: mockRes.data,
            meta: {
                pagination: {
                    page: 1,
                    limit: 2,
                    totalPages: 10,
                    totalItems: 20,
                },
            },
        });
    }));
    (0, node_test_1.it)("getTaskById should return the correct task", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const taskService = new task_service_1.TaskService();
        const mockTask = { id: 1, title: "Task 1" };
        task_model_1.TaskModel.findOne = (query) => __awaiter(void 0, void 0, void 0, function* () {
            node_assert_1.default.deepStrictEqual(query, { where: { id: "1" } });
            return mockTask;
        });
        const result = yield taskService.getTaskById("1");
        node_assert_1.default.deepStrictEqual(result, mockTask);
    }));
    (0, node_test_1.it)("createTask should create a new task", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const taskService = new task_service_1.TaskService();
        const mockTaskData = { title: "New Task", description: "Task description" };
        const mockCreatedTask = Object.assign({ id: 1 }, mockTaskData);
        node_test_1.mock
            .method(task_model_1.TaskModel, "create")
            .mock.mockImplementationOnce(function (data) {
            return __awaiter(this, void 0, void 0, function* () {
                node_assert_1.default.deepStrictEqual(data, mockTaskData);
                return mockCreatedTask;
            });
        });
        const result = yield taskService.createTask(mockTaskData);
        node_assert_1.default.deepStrictEqual(result, mockCreatedTask);
    }));
    (0, node_test_1.it)("updateTask should update the task", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const taskService = new task_service_1.TaskService();
        const mockTaskData = { title: "Updated Task" };
        node_test_1.mock
            .method(task_model_1.TaskModel, "update")
            .mock.mockImplementationOnce(function (data, query) {
            return __awaiter(this, void 0, void 0, function* () {
                node_assert_1.default.deepStrictEqual(data, mockTaskData);
                node_assert_1.default.deepStrictEqual(query, { where: { id: "1" } });
                return [1];
            });
        });
        const result = yield taskService.updateTask("1", mockTaskData);
        node_assert_1.default.deepStrictEqual(result, [1]);
    }));
    (0, node_test_1.it)("deleteTask should delete the task", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const taskService = new task_service_1.TaskService();
        task_model_1.TaskModel.destroy = (query) => __awaiter(void 0, void 0, void 0, function* () {
            node_assert_1.default.deepStrictEqual(query, { where: { id: "1" } });
            return 1;
        });
        const result = yield taskService.deleteTask("1");
        node_assert_1.default.strictEqual(result, 1);
    }));
});
