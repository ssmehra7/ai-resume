import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import pdf from "pdf-parse"; 
import fs from "fs"; 

import path from "node:path";
import { prisma } from "../config/db";


export const uploadResumeController = async(req:Request, res:Response, next:NextFunction) =>{
   //@ts-ignore
    const user = req.user; 
    const files = req.files as { [fieldname:string]:Express.Multer.File[]};

    
    


    // const coverPdfMimeType = files.resumePdf[0].mimetype.split('/').at(-1);
    const fileName = files.resumePdf[0].filename;

    const filePath = path.resolve(__dirname, '../../public/data/uploads', fileName);
    const bufferPdf = fs.readFileSync(filePath);

    const pdfParserResponse = await pdf(bufferPdf); 
    const resumeText = pdfParserResponse.text; 



    const uploadResult = await cloudinary.uploader.upload(filePath, {
        filename_override:fileName, 
        folder:'resume-pdf', 
        format:"pdf", 
        resource_type:"raw"
    }); 

    
    const data = await prisma.resume.create({
        data:{
            userId:user.sub, 
            text:resumeText, 
            resumePdf:uploadResult.url, 
        }
    })

    await fs.promises.unlink(filePath); 
    
    

   res.json({
    message:"Resume Uploaded successfully", 
    data, 
   })
}