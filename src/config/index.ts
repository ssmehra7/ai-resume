
import {config as conf} from "dotenv"; 

conf(); 

export const config = {
    port :process.env.PORT, 
    node_env:process.env.NODE_ENV, 
    dbUrl :"mongodb+srv://simarjeetsinghmehrame21b1631:ZO2UAQ6NuL2lJS1m@assignment.uzor9.mongodb.net/assignmentdb?retryWrites=true&w=majority&appName=assignment", 
    jwtSecret:"dfafasfasdf", 
    geminiKey:"AIzaSyAN41IgOFv84WQA5Uh5Ic7ikJEAF5xmbK8", 
    cloud_name: 'dliwrmlyb', 
    api_key: '147124751375812' , 
    api_secret: 'JjDYWW-zt2ny827VbPW-mCGjs2o'
}


