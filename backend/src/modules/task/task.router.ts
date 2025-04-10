import { Router } from "express";
import { TaskController } from "./task.controller";

const taskRouter = Router();

taskRouter.get("/", TaskController.getTaskList);

taskRouter.post("/", TaskController.createTask);

taskRouter.delete("/:id", TaskController.deleteTask);

taskRouter.get("/:id", TaskController.getTaskById);

taskRouter.put("/:id", TaskController.updateTask);

export { taskRouter };
