import { Router } from "express";

import { taskRouter } from "../../modules/task/task.router";

const apiV1Router = Router();

apiV1Router.use("/task", taskRouter);

export { apiV1Router };
