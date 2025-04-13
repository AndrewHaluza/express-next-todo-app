import { describe, it, mock } from "node:test";
import assert from "node:assert";

import { TaskService } from "./task.service";
import { TaskModel } from "./task.model";
import { GroupedCountResultItem } from "sequelize";

describe("TaskService", () => {
  it("getAllTasks should return paginated tasks with correct metadata", async (t) => {
    const taskService = new TaskService();

    const mockRes = {
      data: [
        { id: 1, title: "Task 1" } as unknown as TaskModel,
        { id: 2, title: "Task 2" } as unknown as TaskModel,
      ] as TaskModel[],
      meta: {
        pagination: { page: 1, limit: 2, totalPages: 10, totalItems: 20 },
      },
    };

    mock
      .method(TaskModel, "findAll")
      .mock.mockImplementationOnce(async function <T>(query) {
        assert.deepStrictEqual(query, {
          limit: 2,
          offset: 0,
          order: [["id", "ASC"]],
        });

        return mockRes.data as T;
      });

    mock
      .method(TaskModel, "count")
      .mock.mockImplementationOnce(async function <T>() {
        return mockRes.meta.pagination.totalItems as T;
      });

    const result = await taskService.getAllTasks(1, 2);

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
  });

  it("getTaskById should return the correct task", async (t) => {
    const taskService = new TaskService();

    const mockTask = { id: 1, title: "Task 1" };

    TaskModel.findOne = async (query) => {
      assert.deepStrictEqual(query, { where: { id: "1" } });
      return mockTask;
    };

    const result = await taskService.getTaskById("1");

    assert.deepStrictEqual(result, mockTask);
  });

  it("createTask should create a new task", async (t) => {
    const taskService = new TaskService();

    const mockTaskData = { title: "New Task", description: "Task description" };
    const mockCreatedTask = { id: 1, ...mockTaskData };

    mock
      .method(TaskModel, "create")
      .mock.mockImplementationOnce(async function <T>(data) {
        assert.deepStrictEqual(data, mockTaskData);
        return mockCreatedTask as T;
      });

    const result = await taskService.createTask(mockTaskData);

    assert.deepStrictEqual(result, mockCreatedTask);
  });

  it("updateTask should update the task", async (t) => {
    const taskService = new TaskService();

    const mockTaskData = { title: "Updated Task" };

    mock
      .method(TaskModel, "update")
      .mock.mockImplementationOnce(async function <T>(data, query) {
        assert.deepStrictEqual(data, mockTaskData);
        assert.deepStrictEqual(query, { where: { id: "1" } });
        return [1] as T;
      });

    const result = await taskService.updateTask("1", mockTaskData);

    assert.deepStrictEqual(result, [1]);
  });

  it("deleteTask should delete the task", async (t) => {
    const taskService = new TaskService();

    TaskModel.destroy = async (query) => {
      assert.deepStrictEqual(query, { where: { id: "1" } });
      return 1;
    };

    const result = await taskService.deleteTask("1");

    assert.strictEqual(result, 1);
  });
});
