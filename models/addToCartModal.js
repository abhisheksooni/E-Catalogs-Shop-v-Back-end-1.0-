import mongoose from "mongoose";
import { nanoid } from "nanoid";

const addToCartSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(6)
    },
    userId:{
        type:String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantity:{
        type:Number
    }
}, { versionKey: false })

export default mongoose.model("addToCart",addToCartSchema)