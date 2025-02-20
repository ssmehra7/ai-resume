import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import {config} from "../config/index"




export const authMiddleware = async (req:Request, res:Response, next:NextFunction)=>{
    try {
            //@ts-ignore
            const authHeader = req.header("Authorization") as string ; 
            const token = authHeader && authHeader.split(' ')[1]; 
            if (!token){
                const error = createHttpError(401, "Token is not present"); 
                return next (error); 
            }

             jwt.verify(token, config.jwtSecret as string, (err, user)=>{
                if (err) {
                    const error = createHttpError(401, "Invalid Token"); 
                    return next(error); 
                }
                //@ts-ignore
                req.user = user; 
                next(); 
             }); 

            



    } catch (error) {
        const err = createHttpError(500, "Something wrong in JWT middleware"); 

        return next(err);
    }
}