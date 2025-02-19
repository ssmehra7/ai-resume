import express from "express"; 
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import createHttpError from "http-errors";
import { prisma } from "./config/db";
import { config } from "./config";
import userRouter from "./user/userRouter";


const app = express(); 

//middlewares

app.use(express.json()); 

app.use("/api/v1/users", userRouter); 







//GLobal error handling 
app.use(globalErrorHandler)



export default app; 