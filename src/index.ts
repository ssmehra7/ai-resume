import express from "express"; 
import { globalErrorHandler} from "./middleware/globalErrorHandler"
import { authMiddleware } from "./middleware/authMiddleware";

import userRouter from "./user/userRouter";
import resumeRouter from "./resume/resumeRouter"; 
import { config } from "./config";
import cors from "cors"; 

import dotenv from "dotenv";
dotenv.config({path:".env"});


const PORT = config.port||3000; 



const app = express();



//middlewares
app.use(cors());  
app.use(express.json());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/resume", resumeRouter);  


const loaded = {
    a:config.port?"loaded":"not loaded", 
    b: config.node_env?"loaded":"not loaded",
    c:config.dbUrl?"loaded":"not loaded",
    d:config.jwtSecret?"loaded":"not loaded",
    e:config.geminiKey?"loaded":"not loaded",
    f:config.cloud_name?"loaded":"not loaded",
    g:config.api_secret?"loaded":"not loaded",
    h:config.api_key?"loaded":"not loaded",
}

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"welcome to the backend server", 
        // config:config,
        loaded,  
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


app.listen(PORT, ()=>{
    console.log("Server is running on port ", PORT); 
})



export default app; 