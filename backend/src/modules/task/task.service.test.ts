import { describe, it, mock } from "node:test";
import assert from "node:assert";

import { TaskService } from "./task.service";
import { TaskModel } from "./task.model";

mock.module("./task.model", {
  namedExports: {
    TaskModel: {
      count: mock.fn(),
      findAll: mock.fn(),
      findOne: mock.fn(),
      create: mock.fn(),
      update: mock.fn(),
      destroy: mock.fn(),
    },
  },
});

describe("TaskService", () => {
  it("getAllTasks should return paginated tasks with correct metadata", async (t) => {
    const taskService = new TaskService();

    const mockTasks = [
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ];

    const result = await taskService.getAllTasks(1, 2);

    assert.deepStrictEqual(result, {
      data: mockTasks,
      meta: {
        pagination: {
          page: 1,
          limit: 2,
          totalPages: 10,
          totalItems: 20,
        },
      },
    });
  });

  it("getTaskById should return the correct task", async (t) => {
    const taskService = new TaskService();

    const mockTask = { id: 1, title: "Task 1" };

    // Mock TaskModel.findOne
    TaskModel.findOne = async (query) => {
      assert.deepStrictEqual(query, { where: { id: "1" } });
      return mockTask;
    };

    const result = await taskService.getTaskById("1");

    assert.deepStrictEqual(result, mockTask);
  });

  it("createTask should create a new task", async (t) => {
    const taskService = new TaskService();

    const mockTaskData = { title: "New Task" };
    const mockCreatedTask = { id: 1, ...mockTaskData };

    // Mock TaskModel.create
    TaskModel.create = async (data) => {
      assert.deepStrictEqual(data, mockTaskData);
      return mockCreatedTask;
    };

    const result = await taskService.createTask(mockTaskData);

    assert.deepStrictEqual(result, mockCreatedTask);
  });

  it("updateTask should update the task", async (t) => {
    const taskService = new TaskService();

    const mockTaskData = { title: "Updated Task" };

    // Mock TaskModel.update
    TaskModel.update = async (data, query) => {
      assert.deepStrictEqual(data, mockTaskData);
      assert.deepStrictEqual(query, { where: { id: "1" } });
      return [1];
    };

    const result = await taskService.updateTask("1", mockTaskData);

    assert.deepStrictEqual(result, [1]);
  });

  it("deleteTask should delete the task", async (t) => {
    const taskService = new TaskService();

    // Mock TaskModel.destroy
    TaskModel.destroy = async (query) => {
      assert.deepStrictEqual(query, { where: { id: "1" } });
      return 1;
    };

    const result = await taskService.deleteTask("1");

    assert.strictEqual(result, 1);
  });
});
