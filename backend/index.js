import express from "express"
import connectDB from './config/db.js'
import dotenv from "dotenv"
import customerRegisterRoutes from  "./routes/customerRoutes.js"

dotenv.config()
connectDB()
const app = express()
const port=process.env.port

app.use(express.json())

app.use("/",customerRegisterRoutes)

app.listen(port,()=>{
    console.log(`server up on port ${port}`)
})