import mongoose from "mongoose";
import { nanoid } from "nanoid";



const categoriesSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(10)
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            lowercase: true,
            required: true,
        }
    }, { versionKey: false, timestamps: true }
)

export default mongoose.model("categories", categoriesSchema)