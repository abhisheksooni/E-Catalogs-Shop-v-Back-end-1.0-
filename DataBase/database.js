import colors  from "colors";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(colors.bgGreen(`Mongo_DB Connect ${process.env.MONGODB_URL}`));
        
    } catch (error) {
        console.log(`MongoDB not Conncet : `,error);
    }
}

export default connectDB