import express from "express"
import connectDB from './config/db.js'
import dotenv from "dotenv"
import customerRegisterRoutes from  "./routes/customerRegisterRoutes.js"
import userRoutes from  "./routes/userRoutes.js"

dotenv.config()
connectDB()
const app = express()
const port=process.env.port

app.use(express.json())

app.use("/register",customerRegisterRoutes)
app.use("/user",userRoutes)

app.listen(port,()=>{
    console.log(`server up on port ${port}`)
})