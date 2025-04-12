import { TaskModel } from "./task.model";
import { crateTaskData, getTasksResponse } from "./task.type";

export class TaskService {
  async getAllTasks(
    page: number = 1,
    limit: number = 10
  ): Promise<getTasksResponse> {
    const offset = (page - 1) * limit;

    const [totalItems, tasks] = await Promise.all([
      TaskModel.count(),
      TaskModel.findAll({
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
  }

  async getTaskById(id: string) {
    return TaskModel.findOne({ where: { id } });
  }

  async createTask(taskData: crateTaskData) {
    return TaskModel.create(taskData);
  }

  async updateTask(id: string, taskData: any) {
    return TaskModel.update(taskData, { where: { id } });
  }

  async deleteTask(id: string) {
    return TaskModel.destroy({ where: { id } });
  }
}
