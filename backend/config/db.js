import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URI, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log("Database connection successful")
    } catch (error) {
        console.error("Failed to establish connection with database",error)
        process.exit(1)
    }
};

module.exports(connectDB);