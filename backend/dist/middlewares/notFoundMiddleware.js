export function notFoundMiddleware(req, res, next) {
    var error = new Error("Not Found", { cause: { status: 404 } });
    next(error);
}
