import { Router } from "express";
import { apiV1Router } from "./api/apiV1Router";
var apiRouter = Router();
apiRouter.use("/v1", apiV1Router);
export { apiRouter };
