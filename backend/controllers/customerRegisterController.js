import customer from "../models/customer.js";
import twilio from "twilio"
import cli from "../config/twilio.js"
import bcrypt from "bcrypt"

const registerCustomer = async(req,res) =>{
    try {
        const newCustomer = await customer.create(req.body);
        res.status(201).json(
            {
                "Application id":newCustomer._id,
                Discription:"Customer registered successfuly",
                status:"SUCCESS"
            })
        } catch (error) {
            console.error("Error: ", error);
            res.status(500).json({ error: 'Failed to create customer' });
        }
}

const loginDetails = async(req,res) =>{
    const { id, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedCustomer = await customer.findByIdAndUpdate(
            id,
            { "loginDetails.username" : username, "loginDetails.password": hashedPassword },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(200).json({ message: 'Username and password updated successfully'});
    } catch (error) {
        console.error('Error updating username and password:', error);
        res.status(500).json({ error: 'Failed to update username and password' });
    }                                 
}

const employmentDetails =async(req,res)=>{
    try {
        const user = await customer.findByIdAndUpdate(
            req.body.id,
            { employmentDetails : req.body.employmentDetails},
            { new: true}
        )

        
        if (!user) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Updated Customer'});
        
    } catch (error) {
        res.status(500).json({ message: 'Error updating employment details', error });
        throw error;
    }
}
    
const updateMail = async(id,mail) =>{
    try {
    const user = await customer.findByIdAndUpdate(id, { email:mail }, { new: true });
    
    if (!user) {
        throw new Error('User not found');
    }
    
    console.log(`Email updated for user`);
} catch (error) {
    console.error(`Error updating Email: ${error.message}`)
    throw error
}
}
    
const updateNumber = async(id,number) =>{
    try {
        const user = await customer.findByIdAndUpdate(id, { mobile: number }, { new: true });
        
        if (!user) {
            throw new Error('User not found');
        }
        
        console.log(`Mobile number updated for user ${id}`);
    } catch (error) {
        console.error(`Error updating mobile number: ${error.message}`);
        throw error;
    }
}

const updateMobile = async(req,res) =>{
    try{
        const verification = await cli.client.verify.v2
        .services(cli.sid)
        .verifications.create({
            channel: "sms",
            to: "+91"+req.body.mobile,
        });
        res.status(200).json(
            {
                status:"Verification code sent"
            })
            console.log(verification)
        } catch(error){
            console.log(error)
            res.status(500).json({ error: 'Failed to send verification code' })
    }
}
        
const verifyMobile= async(req,res) =>{
    try{
        console.log(req.body)
        const verificationCheck = await cli.client.verify.v2
        .services(cli.sid)
        .verificationChecks.create({
            to: "+91"+req.body.mobile,
            code: req.body.code
        });
        console.log(verificationCheck);
        if(verificationCheck.status==='approved'){
            try {
                await updateNumber(req.body.id,req.body.mobile)
                res.status(200).json({ status: 'Mobile number updated' });
                
            }
            catch(error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to update mobile number' });
            }
        }
        else{
            res.status(400)
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed' })
    }
}
        
const updateEmail = async(req,res) =>{
    try{
        const verification = await cli.client.verify.v2
        .services(cli.sid)
        .verifications.create({
            channel: "email",
            to: req.body.mail,
        });
        res.status(200).json(
            {
                status:"Verification code sent"
            })
            console.log(verification);
        } catch(error){
            console.log(error);
            res.status(500).json({ error: 'Failed to send verification code' });
    }
}

const verifyEmail = async(req,res) =>{
    try{
        console.log(req.body)
        const verificationCheck = await cli.client.verify.v2
        .services(cli.sid)
        .verificationChecks.create({
            to: req.body.mail,
            code: req.body.code
        })
        console.log(verificationCheck)
        if(verificationCheck.status==='approved'){
            try {
                    await updateMail(req.body.id,req.body.mail)
                    res.status(200).json({ status: 'Email updated successfuly' });
            }
            catch(error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to update email' });
            }
        }
        else{
            res.status(400)
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed' });
    }
}

export default{
    registerCustomer,
    updateMobile,
    verifyMobile,
    updateEmail,
    verifyEmail,
    loginDetails,
    employmentDetails
}