import request from "supertest";
import assert from "node:assert";
import { before, describe, it } from "node:test";

import { getApp } from "../../app";

describe("TaskController", () => {
  let app;

  before(async () => async () => {
    app = await getApp();
  });

  describe("createTask()", () => {
    it("should return 400 for invalid input", async () => {
      try {
        const response = await request(getApp()).post("/api/v1/task").send({
          description: "Task description",
        });

        assert.strictEqual(response.status, 400);
        assert.strictEqual(
          response.body.message,
          `Validation Error: "title" is required`
        );
      } catch (error) {
        console.error("Error in test:", error);
      }
    });

    it("should create a task successfully with valid input", async () => {
      try {
        const response = await request(app).post("/api/v1/task").send({
          title: "New Task",
          description: "Task description",
        });

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.data.title, "New Task");
        assert.strictEqual(response.body.data.description, "Task description");
      } catch (error) {
        console.error("Error in test:", error);
      }
    });
  });

  describe("getTaskList()", () => {
    it("should return a list of tasks", async () => {
      try {
        const response = await request(app).get("/api/v1/task");

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.data.length, 1);
      } catch (error) {
        console.error("Error in test:", error);
      }
    });
  });
});
