
import express from "express"; 
import { searchController } from "./searchController";
import { authMiddleware } from "../middleware/authMiddleware";

const searchRouter = express.Router(); 



searchRouter.post("/",authMiddleware ,searchController);

export default searchRouter; 
