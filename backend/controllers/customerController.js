import customer from "../models/customer.js";
import twilio from "twilio"
import dotenv from "dotenv";

dotenv.config()

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

const accountSid = process.env.accountSid
const authToken = process.env.authToken
const sid=process.env.sid
const client = twilio(accountSid, authToken);

const updateMail = async(id,mail) =>{
    try {
        const user = await customer.findByIdAndUpdate(id, { email:mail }, { new: true });

        if (!user) {
            throw new Error('User not found');
        }

        console.log(`Email number updated for user`);
    } catch (error) {
        console.error(`Error updating Email: ${error.message}`);
        throw error;
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
        const verification = await client.verify.v2
        .services(sid)
        .verifications.create({
            channel: "sms",
            to: "+91"+req.body.mobile,
        });
        res.status(200).json(
            {
                status:"Verification code sent"
            })
        console.log(verification);
    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Failed' });
    }
}

const verifyMobile= async(req,res) =>{
    try{
        console.log(req.body)
        const verificationCheck = await client.verify.v2
        .services(sid)
        .verificationChecks.create({
            to: "+91"+req.body.mobile,
            code: req.body.code
        });
        console.log(verificationCheck);
        if(verificationCheck.status==='approved'){
            try {
                    await updateNumber(req.body.id,req.body.mobile)
                    res.status(200).json({ status: 'udpdated' });

            }
            catch(error) {
                console.log(error);
                res.status(500).json({ error: 'Failed' });
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

const updateEmail = async(req,res) =>{
    try{
        const verification = await client.verify.v2
        .services(sid)
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
        res.status(500).json({ error: 'Failed' });
    }
}

const verifyEmail = async(req,res) =>{
    try{
        console.log(req.body)
        const verificationCheck = await client.verify.v2
        .services(sid)
        .verificationChecks.create({
            to: req.body.mail,
            code: req.body.code
        });
        console.log(verificationCheck);
        if(verificationCheck.status==='approved'){
            try {
                    await updateMail(req.body.id,req.body.mail)
                    res.status(200).json({ status: 'Success' });
            }
            catch(error) {
                console.log(error);
                res.status(500).json({ error: 'Failed' });
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
    verifyEmail
}