var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { describe, it, mock } from "node:test";
import assert from "node:assert";
import { TaskService } from "./task.service";
import { TaskModel } from "./task.model";
describe("TaskService", function () {
    it("getAllTasks should return paginated tasks with correct metadata", function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var taskService, mockRes, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskService = new TaskService();
                    mockRes = {
                        data: [
                            { id: 1, title: "Task 1" },
                            { id: 2, title: "Task 2" },
                        ],
                        meta: {
                            pagination: { page: 1, limit: 2, totalPages: 10, totalItems: 20 },
                        },
                    };
                    mock
                        .method(TaskModel, "findAll")
                        .mock.mockImplementationOnce(function (query) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                assert.deepStrictEqual(query, {
                                    limit: 2,
                                    offset: 0,
                                    order: [["id", "ASC"]],
                                });
                                return [2 /*return*/, mockRes.data];
                            });
                        });
                    });
                    mock
                        .method(TaskModel, "count")
                        .mock.mockImplementationOnce(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, mockRes.meta.pagination.totalItems];
                            });
                        });
                    });
                    return [4 /*yield*/, taskService.getAllTasks(1, 2)];
                case 1:
                    result = _a.sent();
                    assert.deepStrictEqual(result, {
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
                    return [2 /*return*/];
            }
        });
    }); });
    it("getTaskById should return the correct task", function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var taskService, mockTask, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskService = new TaskService();
                    mockTask = { id: 1, title: "Task 1" };
                    TaskModel.findOne = function (query) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            assert.deepStrictEqual(query, { where: { id: "1" } });
                            return [2 /*return*/, mockTask];
                        });
                    }); };
                    return [4 /*yield*/, taskService.getTaskById("1")];
                case 1:
                    result = _a.sent();
                    assert.deepStrictEqual(result, mockTask);
                    return [2 /*return*/];
            }
        });
    }); });
    it("createTask should create a new task", function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var taskService, mockTaskData, mockCreatedTask, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskService = new TaskService();
                    mockTaskData = { title: "New Task", description: "Task description" };
                    mockCreatedTask = __assign({ id: 1 }, mockTaskData);
                    mock
                        .method(TaskModel, "create")
                        .mock.mockImplementationOnce(function (data) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                assert.deepStrictEqual(data, mockTaskData);
                                return [2 /*return*/, mockCreatedTask];
                            });
                        });
                    });
                    return [4 /*yield*/, taskService.createTask(mockTaskData)];
                case 1:
                    result = _a.sent();
                    assert.deepStrictEqual(result, mockCreatedTask);
                    return [2 /*return*/];
            }
        });
    }); });
    it("updateTask should update the task", function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var taskService, mockTaskData, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskService = new TaskService();
                    mockTaskData = { title: "Updated Task" };
                    mock
                        .method(TaskModel, "update")
                        .mock.mockImplementationOnce(function (data, query) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                assert.deepStrictEqual(data, mockTaskData);
                                assert.deepStrictEqual(query, { where: { id: "1" } });
                                return [2 /*return*/, [1]];
                            });
                        });
                    });
                    return [4 /*yield*/, taskService.updateTask("1", mockTaskData)];
                case 1:
                    result = _a.sent();
                    assert.deepStrictEqual(result, [1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("deleteTask should delete the task", function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var taskService, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    taskService = new TaskService();
                    TaskModel.destroy = function (query) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            assert.deepStrictEqual(query, { where: { id: "1" } });
                            return [2 /*return*/, 1];
                        });
                    }); };
                    return [4 /*yield*/, taskService.deleteTask("1")];
                case 1:
                    result = _a.sent();
                    assert.strictEqual(result, 1);
                    return [2 /*return*/];
            }
        });
    }); });
});
