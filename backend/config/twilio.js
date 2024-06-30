import twilio from "twilio"
import dotenv from "dotenv";

dotenv.config()

const accountSid = process.env.accountSid
const authToken = process.env.authToken
const sid=process.env.sid

const client =await twilio(accountSid, authToken);

export default {
    client,
    sid
}