
import {config as conf} from "dotenv"; 

conf(); 

export const config = {
    port :process.env.PORT, 
    node_env:process.env.NODE_ENV, 
    dbUrl :process.env.DATABASE_URL, 
    jwtSecret:process.env.JWT_SECRET, 
    geminiKey:process.env.GEMINI_API_KEY, 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
}


