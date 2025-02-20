import express from "express"; 
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import createHttpError from "http-errors";
import { prisma } from "./config/db";
import { config } from "./config";
import userRouter from "./user/userRouter";
import { authMiddleware } from "./middleware/authMiddleware";
import resumeRouter from "./resume/resumeRouter";




const app = express();



//middlewares

app.use(express.json()); 

app.use("/api/v1/users", userRouter);
app.use("/api/v1/resume", resumeRouter);  









//GLobal error handling 
app.use(globalErrorHandler)



export default app; 