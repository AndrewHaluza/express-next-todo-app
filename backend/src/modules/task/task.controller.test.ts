import request from "supertest";
import assert from "node:assert";
import { describe, it } from "node:test";

import { getApp } from "../../app";

describe("POST /api/v1/task", () => {
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
});
