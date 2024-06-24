import express from "express"
import connectDB from './config/db.js'
import dotenv from "dotenv"
import customerRoutes from  "./routes/customerRoutes.js"

dotenv.config()
connectDB()
const app = express()
const port=process.env.port

app.use(express.json())

app.use("/",customerRoutes)

app.listen(port,()=>{
    console.log(`server up on port ${port}`)
})