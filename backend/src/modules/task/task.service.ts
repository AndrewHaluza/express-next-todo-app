import { TaskModel } from "./task.model";
import { crateTaskData } from "./task.type";

export class TaskService {
  async getAllTasks(offset: number = 0) {
    return TaskModel.findAll({ limit: 10, offset });
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
