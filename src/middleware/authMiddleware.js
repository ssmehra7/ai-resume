"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../config/index");
const authMiddleware = async (req, res, next) => {
    try {
        //@ts-ignore
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            const error = (0, http_errors_1.default)(401, "Token is not present");
            return next(error);
        }
        jsonwebtoken_1.default.verify(token, index_1.config.jwtSecret, (err, user) => {
            if (err) {
                const error = (0, http_errors_1.default)(401, "Invalid Token");
                return next(error);
            }
            //@ts-ignore
            req.user = user;
            next();
        });
    }
    catch (error) {
        const err = (0, http_errors_1.default)(500, "Something wrong in JWT middleware");
        return next(err);
    }
};
exports.authMiddleware = authMiddleware;
