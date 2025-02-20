import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import createHttpError from "http-errors";



export const resumeLlmGenerateRouter = async (req:Request,res:Response, next:NextFunction)=>{
    //@ts-ignore
    const userId = req.user.sub; 
    const resumeId = req.params.resumeId; 

    const resume = await prisma.resume.findFirst({
        where:{
            id:resumeId, 
            userId:userId, 
        }
    }); 

    if (!resume){
        const error = createHttpError(401, "Resume is not Found"); 
        return next(error); 
    }

    const text = resume.text; 

    //generate the google api thingy;


    res.status(200).json({
        message:"LLM generator works fine", 
        text, 
    })

    return ; 


}