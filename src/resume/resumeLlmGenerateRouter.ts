import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import createHttpError from "http-errors";
import { model } from "../config/geminiconfig";



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

    if (resume.userId !== userId){
        const error = createHttpError(400, "User is not logged in"); 
        return next(error); 
    }
    const text = resume.text; 
    

    //generate the google api thingy;

    const prompt = text; 
    const result = await model.generateContent(prompt); 
    // console.log("text result" , result.response.text()); 
    const resultJSON = JSON.parse(result.response.text());
    console.log(resultJSON);  
    try {
        const response = await prisma.llmOutput.create({
            data:{
                resumeId, 
                email:resultJSON.email, 
                education:resultJSON.education, 
                experience:resultJSON.experience, 
                skills:resultJSON.skills, 
                summary:resultJSON.summary, 
            }
        }); 
        res.status(200).json({
            message:"LLM generator works fine", 
            id:response.id, 
            response, 
            
        })
        return ; 
    } catch (error) {
        console.log("error is --> ", error); 
        return; 
    }
    


    


    

 


}