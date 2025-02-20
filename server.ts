
import app from "./src"
import { config } from "./src/config";




const startServer = () =>{

    const port = config.port||3000;

    // console.log(config.dbUrl); 

    app.listen(port, ()=>{
        console.log("Server is listening on port ", port); 
    })
}


startServer(); 
// console.log("hi")