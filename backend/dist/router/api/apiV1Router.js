"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiV1Router = void 0;
const express_1 = require("express");
const task_router_1 = require("../../modules/task/task.router");
const apiV1Router = (0, express_1.Router)();
exports.apiV1Router = apiV1Router;
apiV1Router.use("/task", task_router_1.taskRouter);
