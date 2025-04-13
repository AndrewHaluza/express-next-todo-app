import cors from "cors";
import express from "express";
import { router } from "./router";
import logger from "./shared/utils/logger";
var port = process.env.APP_PORT || "9090";
var app = express();
app.disable("x-powered-by");
app.use(cors({ origin: "*" }));
app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
});
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(router);
app.listen(port, function () {
    logger.info("The server is running at http://localhost:".concat(port));
});
export var getApp = function () { return app; };
