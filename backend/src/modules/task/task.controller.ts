import { Validate } from "../../shared/decorators/validate";
import * as global from "../../shared/types/global";
import { TaskModel } from "./task.model";
import {
  createTaskSchema,
  idParamsSchema,
  paginationQueryParamsSchema,
  updateTaskSchema,
} from "./task.schema";
import { TaskService } from "./task.service";
import { crateTaskData, getTasksResponse, updateTaskData } from "./task.type";

const taskService = new TaskService();

export class TaskController {
  @Validate(paginationQueryParamsSchema, "query")
  public static async getTaskList(
    req: global.Request,
    res: global.Response<getTasksResponse>
  ) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const tasks = await taskService.getAllTasks(page, limit);

    res.send(tasks);
  }

  @Validate(idParamsSchema, "params")
  public static async getTaskById(
    req: global.Request<crateTaskData>,
    res: global.Response
  ) {
    const data = await taskService.getTaskById(req.params.id);

    res.send({ data });
  }

  @Validate(idParamsSchema, "params")
  @Validate(updateTaskSchema)
  public static async updateTask(
    req: global.Request<updateTaskData>,
    res: global.Response<{ message: string }>
  ) {
    await taskService.updateTask(req.params.id, req.body);

    res.send({ message: "Task updated successfully" });
  }

  @Validate(createTaskSchema)
  public static async createTask(
    req: global.Request<crateTaskData>,
    res: global.Response<global.CommonResponse<TaskModel>>
  ) {
    const data = await taskService.createTask(req.body);

    res.send({ data });
  }

  @Validate(idParamsSchema, "params")
  public static async deleteTask(req: global.Request, res: global.Response) {
    await taskService.deleteTask(req.params.id);

    res.json({ message: "Task deleted" });
  }
}
