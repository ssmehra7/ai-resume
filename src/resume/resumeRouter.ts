import express from "express"; 
import path from "node:path"; 
import { uploadResumeController } from "./uploadResumeController";
import multer from "multer";
// import { fileURLToPath } from "url"; 
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const resumeRouter = express.Router(); 
const uploads = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'), 
    limits:{fieldSize:3e7}
}); 


// resumeRouter.post("/",uploads.fields([
//     {resumePdf:'resumePdf', maxCount:1}
// ]),uploadResumeController);

resumeRouter.post("/", uploads.fields([
    { name: 'resumePdf', maxCount: 1 }
]), uploadResumeController);



export default resumeRouter; 


