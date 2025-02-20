import { NextFunction, Request, Response } from "express";


export const uploadResumeController = (req:Request, res:Response, next:NextFunction) =>{
   
    console.log("fields", req.files); 

   
}