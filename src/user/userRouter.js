"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const userRouter = express_1.default.Router();
userRouter.post("/signup", userController_1.signUpRouter);
userRouter.post("/signin", userController_1.signInRouter);
exports.default = userRouter;
