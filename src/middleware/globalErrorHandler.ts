import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from "../config";




export const globalErrorHandler = (err:HttpError, req:Request, res:Response, next:NextFunction)=>{
    
    const statusCode = err.statusCode; 
    const errorMessage = err.message; 
    const errorStack = err.stack;


    res.status(statusCode).json({
        statusCode, 
        errorMessage, 
        errorStack: config.node_env === "development"?errorStack:"", 
    })

}