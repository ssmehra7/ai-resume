import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import pdf from "pdf-parse";
import fs from "fs";

import path from "node:path";
import { prisma } from "../config/db";
import createHttpError from "http-errors";
import { create } from "node:domain";


export const uploadResumeController = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user = req.user;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };





    // const coverPdfMimeType = files.resumePdf[0].mimetype.split('/').at(-1);
    const fileName = files.resumePdf[0].filename;

    const filePath = path.resolve(__dirname, '../../public/data/uploads', fileName);
    const bufferPdf = fs.readFileSync(filePath);
    try {
        const pdfParserResponse = await pdf(bufferPdf);
        const resumeText = pdfParserResponse.text;

        try {
            const uploadResult = await cloudinary.uploader.upload(filePath, {
                filename_override: fileName,
                folder: 'resume-pdf',
                format: "pdf",
                resource_type: "raw"
            });

            try {

                const data = await prisma.resume.create({
                    data: {
                        userId: user.sub,
                        text: resumeText,
                        resumePdf: uploadResult.url,
                    }
                })
                try {
                    await fs.promises.unlink(filePath);



                    res.json({
                        message: "Resume Uploaded successfully",
                        data,
                    })
                } catch (error) {
                    console.log("Error is, ", error);
                    return next(createHttpError(500, "Error in temproliy deleting the file"));

                }

            } catch (error) {
                console.log("Error is ", error);
                return next(createHttpError(500, "Error in uploading to the DB "));
            }
        } catch (error) {
            console.log("Error is , ", error);
            return next(createHttpError(500, "Error in the sending to cloudinary."));
        }



    } catch (error) {
        console.log("Error is , ", error);
        return next(createHttpError(500, "Error in parsing the pdf"));
    }

}