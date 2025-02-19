
import {config as conf} from "dotenv"; 

conf(); 

export const config = {
    port :process.env.PORT, 
    node_env:process.env.NODE_ENV, 
    dbUrl :process.env.DATABASE_URL, 
    jwtSecret:process.env.JWT_SECRET, 
}


