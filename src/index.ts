import express from "express"; 
import { globalErrorHandler } from "./middleware/globalErrorHandler";

import userRouter from "./user/userRouter";
import { authMiddleware } from "./middleware/authMiddleware";
import resumeRouter from "./resume/resumeRouter";
import { config } from "./config";




const app = express();



//middlewares

app.use(express.json()); 

app.use("/api/v1/users", userRouter);
app.use("/api/v1/resume", resumeRouter);  

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"welcome to the backend server", 
        config:config, 
    })
    return ; 
})






app.get("/protected", authMiddleware, (req,res)=>{
    //@ts-ignore
    const user = req.user; 

    res.json({
        message:"route is protected", 
        user, 
    }); 

    return ; 
})


//GLobal error handling 
app.use(globalErrorHandler)



export default app; 