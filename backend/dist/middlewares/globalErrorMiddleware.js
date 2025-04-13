import Joi from "joi";
import logger from "../shared/utils/logger";
export var globalErrorHandlerMiddleware = function (error, req, res, next) {
    var _a;
    if (res.headersSent) {
        next(error);
        return;
    }
    var message = error.message || "Internal Server Error";
    var status = ((_a = error.cause) === null || _a === void 0 ? void 0 : _a.status) || 500;
    logger.error(error);
    if (error instanceof Joi.ValidationError) {
        status = 400;
        message = "Validation Error: ".concat(error.details
            .map(function (detail) { return detail.message; })
            .join(", "));
    }
    var response = {
        status: status,
        json: { message: message },
    };
    res.status(response.status).send(response.json);
};
