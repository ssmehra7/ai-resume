import { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";
import { prisma } from "../config/db";



export const searchController = async (req:Request, res:Response, next:NextFunction)=>{
    const {name} = req.body; 
    //@ts-ignore
    const user = req.user; 

    if(!name){
        const error = createHttpError(400, "No input"); 
        return next(error); 
    }

    try {
        const data = await prisma.user.findMany({
            where:{
                userName: { contains: name, mode: "insensitive" },
            }
        }); 

        if (data.length === 0){
            return next(createHttpError(404,"No entries found")); 
        }

        res.status(200).json({
            message:"Search success", 
            users:data, 
        })

        return ; 

    } catch (error) {
        return next(createHttpError(500, "Error in finding user")); 
    }
   
    

}