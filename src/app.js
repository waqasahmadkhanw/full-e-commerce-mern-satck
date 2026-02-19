 import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
 const app=express()
 app.use(cors({
    origin:process.env.CORS.ORIGIN,
    credentials:true
 }))
 app.use(express.json({limit:"16kb"}))
 app.use(express.urlencoded({extended:true,limit:"16kb"}))
 app.use(express.static(path.resolve("/public/temp")))
 app.use(cookieParser())
 export default app