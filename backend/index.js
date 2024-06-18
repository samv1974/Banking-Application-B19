import express from "express"
import {connectDB} from "./config/db"
import dotenv from "dotenv"

dotenv.config()
connectDB()
const app = express()
const port=process.env.port

app.listen(port,()=>{
    console.log(`server up on port ${port}`)
})