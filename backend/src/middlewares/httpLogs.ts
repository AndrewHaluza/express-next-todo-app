import morgan from "morgan";

import logger from "../shared/utils/logger";

export function httpLogs() {
  return morgan(
    ":method :url HTTP/:http-version :status :res[content-length] - :response-time ms",
    {
      stream: {
        write: (message) => logger.http(message.trim()),
      },
    },
  );
}
