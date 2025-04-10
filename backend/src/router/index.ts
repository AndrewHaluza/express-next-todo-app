import { Router } from "express";

import { globalErrorHandlerMiddleware } from "../middlewares/globalErrorMiddleware";
import { notFoundMiddleware } from "../middlewares/notFoundMiddleware";
import { apiRouter } from "./apiRouter";
import { httpLogs } from "../middlewares/httpLogs";

const router = Router();


router.use(httpLogs());

router.use("/api", apiRouter);

router.use(notFoundMiddleware);
router.use(globalErrorHandlerMiddleware);

export { router };
