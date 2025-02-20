"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = require("../config");
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode;
    const errorMessage = err.message;
    const errorStack = err.stack;
    res.status(statusCode).json({
        statusCode,
        errorMessage,
        errorStack: config_1.config.node_env === "development" ? errorStack : "",
    });
};
exports.globalErrorHandler = globalErrorHandler;
