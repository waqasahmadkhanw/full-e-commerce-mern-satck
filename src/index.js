import app from "./app.js";
import DbConnection from "./db/index.js";
import dotenv from "dotenv"
dotenv.config({path:"./.env"})
DbConnection()
.then(()=>{
    app.listen(process.env.PORT||6000, () => {
      console.log(`SERVER IS LISTENIG AT PORT:${process.env.PORT}`)
})
})
.catch((error)=>{
    console.log("Server connection error",error)
    process.exit(1)
})