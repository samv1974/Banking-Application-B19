import customer from "../models/customer.js"
import bcrypt from "bcrypt"

const login = async(req,res) =>{
    try{
        const {username,password} = req.body

        const user = await customer.findOne({"loginDetails.username":username})
        
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.loginDetails.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(201).json({status:"success"})

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
} 

export default{
    login
}