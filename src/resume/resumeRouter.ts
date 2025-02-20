import express from "express"; 
import { uploadResumeController } from "./uploadResumeController";

const resumeRouter = express.Router(); 


resumeRouter.post("/", uploadResumeController); 


export default resumeRouter; 


