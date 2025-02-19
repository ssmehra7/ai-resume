import express from "express"; 
import createHttpError from "http-errors";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 
import { prisma } from "../config/db";
import { config } from "../config";
import { signInRouter, signUpRouter } from "./userController";


const userRouter = express.Router(); 




userRouter.post("/signup", signUpRouter); 
userRouter.post("/signin", signInRouter); 

export default userRouter; 