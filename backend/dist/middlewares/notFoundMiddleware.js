"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = notFoundMiddleware;
function notFoundMiddleware(req, res, next) {
    const error = new Error("Not Found", { cause: { status: 404 } });
    next(error);
}
