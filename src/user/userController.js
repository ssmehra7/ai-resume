"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInRouter = exports.signUpRouter = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const config_1 = require("../config");
const signUpRouter = async (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        const error = (0, http_errors_1.default)(401, "No user input");
        return next(error);
    }
    //checking of existing user
    const user = await db_1.prisma.user.findFirst({
        where: {
            userName,
        }
    });
    if (user) {
        const error = (0, http_errors_1.default)(403, "User already exit");
        return next(error);
    }
    //hasing the password
    const hashPassword = await bcrypt_1.default.hash(password, 10);
    //creating the user
    try {
        const newUser = await db_1.prisma.user.create({
            data: {
                userName,
                password: hashPassword,
            }
        });
        console.log("newUser is ", newUser);
        console.log("jwtsecret", config_1.config.jwtSecret);
        //creating user 
        const token = jsonwebtoken_1.default.sign({
            sub: newUser.id
        }, config_1.config.jwtSecret, { expiresIn: "7d" });
        res.status(201).json({
            message: "User created successfully",
            accessToken: token,
        });
        return;
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, "Error in creating user"));
    }
};
exports.signUpRouter = signUpRouter;
const signInRouter = async (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        const error = (0, http_errors_1.default)(401, "No user input");
        return next(error);
    }
    //checking of user
    try {
        const user = await db_1.prisma.user.findFirst({
            where: {
                userName,
            }
        });
        if (!user) {
            const error = (0, http_errors_1.default)(401, "User doesnot exist");
            return next(error);
        }
        //hasing the password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        //checking matching password
        if (!isMatch) {
            const error = (0, http_errors_1.default)(400, "Password is incorrect.");
            return next(error);
        }
        const token = await jsonwebtoken_1.default.sign({
            sub: user.id
        }, config_1.config.jwtSecret, { expiresIn: "7d" });
        res.status(200).json({
            message: "User logged in successfully",
            accessToken: token,
        });
        return;
    }
    catch (error) {
        return next((0, http_errors_1.default)(500, "Error in signing the user"));
    }
};
exports.signInRouter = signInRouter;
