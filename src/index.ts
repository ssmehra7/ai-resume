import express from "express"; 
import { globalErrorHandler} from "./middleware/globalErrorHandler"
import { authMiddleware } from "./middleware/authMiddleware";

import userRouter from "./user/userRouter";
import resumeRouter from "./resume/resumeRouter"; 
import { config } from "./config";
import cors from "cors"; 

import dotenv from "dotenv";
import searchRouter from "./search/searchRouter";
dotenv.config({path:".env"});


const PORT = config.port||3000; 



const app = express();



//middlewares
app.use(cors());  
app.use(express.json());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/resume", resumeRouter);  
app.use("/api/v1/search",searchRouter); 




app.get("/", (req,res )=>{
    res.status(200).json({
        message:"Welcome to the api routes", 
    })
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