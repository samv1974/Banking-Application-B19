import express from "express"
import connectDB from './config/db.js'
import dotenv from "dotenv"
import customer from "./models/customer.js"
import { dirname } from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config()
connectDB()
const app = express()
const port=process.env.port

app.use(express.json())

app.post("/register",async (req,res)=>{
    try {
        const newCustomer = await customer.create(req.body);
        res.status(201).json({"Application id":newCustomer._id,Discription:"Customer registered successfuly",status:"SUCCESS"});
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
})

app.listen(port,()=>{
    console.log(`server up on port ${port}`)
})