"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const uploadResumeController_1 = require("./uploadResumeController");
const multer_1 = __importDefault(require("multer"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const resumeLlmGenerateRouter_1 = require("./resumeLlmGenerateRouter");
const resumeRouter = express_1.default.Router();
const uploads = (0, multer_1.default)({
    dest: node_path_1.default.resolve(__dirname, '../../public/data/uploads'),
    limits: { fieldSize: 3e7 }
});
resumeRouter.post("/", authMiddleware_1.authMiddleware, uploads.fields([
    { name: 'resumePdf', maxCount: 1 }
]), uploadResumeController_1.uploadResumeController);
resumeRouter.get("/:resumeId", authMiddleware_1.authMiddleware, resumeLlmGenerateRouter_1.resumeLlmGenerateRouter);
exports.default = resumeRouter;
