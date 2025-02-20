"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const userRouter_1 = __importDefault(require("./user/userRouter"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const resumeRouter_1 = __importDefault(require("./resume/resumeRouter"));
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use("/api/v1/users", userRouter_1.default);
app.use("/api/v1/resume", resumeRouter_1.default);
app.get("/protected", authMiddleware_1.authMiddleware, (req, res) => {
    //@ts-ignore
    const user = req.user;
    res.json({
        message: "route is protected",
        user,
    });
    return;
});
//GLobal error handling 
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
