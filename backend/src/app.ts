import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { router } from "./router";
import logger from "./shared/utils/logger";

const port = process.env.APP_PORT || "9090";

const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(router);

app.listen(port, () => {
  logger.info(`The server is running at http://localhost:${port}`);
});

export const getApp = () => app;
