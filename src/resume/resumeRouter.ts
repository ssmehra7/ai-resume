import express from "express"; 
import path from "node:path"; 
import { uploadResumeController } from "./uploadResumeController";
import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware";
import { resumeLlmGenerateRouter } from "./resumeLlmGenerateRouter";


const resumeRouter = express.Router(); 
const uploads = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'), 
    limits:{fieldSize:3e7}
}); 




resumeRouter.post("/",authMiddleware,  uploads.fields([
    { name: 'resumePdf', maxCount: 1 }
]), uploadResumeController);

resumeRouter.get("/:resumeId",authMiddleware,  resumeLlmGenerateRouter); 


export default resumeRouter; 


