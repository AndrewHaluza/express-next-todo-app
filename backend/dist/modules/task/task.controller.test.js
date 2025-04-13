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
const supertest_1 = __importDefault(require("supertest"));
const node_assert_1 = __importDefault(require("node:assert"));
const node_test_1 = require("node:test");
const app_1 = require("../../app");
(0, node_test_1.describe)("TaskController", () => {
    let app;
    (0, node_test_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
        return () => __awaiter(void 0, void 0, void 0, function* () {
            app = yield (0, app_1.getApp)();
        });
    }));
    (0, node_test_1.describe)("createTask()", () => {
        (0, node_test_1.it)("should return 400 for invalid input", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield (0, supertest_1.default)((0, app_1.getApp)()).post("/api/v1/task").send({
                    description: "Task description",
                });
                node_assert_1.default.strictEqual(response.status, 400);
                node_assert_1.default.strictEqual(response.body.message, `Validation Error: "title" is required`);
            }
            catch (error) {
                console.error("Error in test:", error);
            }
        }));
        (0, node_test_1.it)("should create a task successfully with valid input", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield (0, supertest_1.default)(app).post("/api/v1/task").send({
                    title: "New Task",
                    description: "Task description",
                });
                node_assert_1.default.strictEqual(response.status, 200);
                node_assert_1.default.strictEqual(response.body.data.title, "New Task");
                node_assert_1.default.strictEqual(response.body.data.description, "Task description");
            }
            catch (error) {
                console.error("Error in test:", error);
            }
        }));
    });
    (0, node_test_1.describe)("getTaskList()", () => {
        (0, node_test_1.it)("should return a list of tasks", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield (0, supertest_1.default)(app).get("/api/v1/task");
                node_assert_1.default.strictEqual(response.status, 200);
                node_assert_1.default.strictEqual(response.body.data.length, 1);
            }
            catch (error) {
                console.error("Error in test:", error);
            }
        }));
    });
});
