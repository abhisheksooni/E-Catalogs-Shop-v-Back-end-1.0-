import mongoose from "mongoose";
import { nanoid, customAlphabet } from 'nanoid'



function arrayLimit(val) {
    return val.length <= 5;
}

// constom nanoid
let nanoID = customAlphabet("1234567890qwertyuiopasdfghjklzxcvbnm", 10)




const ProductSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => nanoID(),
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lowercase: true,
        // required: true,
    },
    price: {
        type: Number,
        // required: true,
    },
    description: {
        type: String,
        // required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    categories_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    cloudinary_id: {
        type: String
    },
    cloudinary_ids: {
        type: [String]
    },
    thumbnail: {
        type: String,
    },
    images: {
        type: [String],
        validate: [arrayLimit, 'Exceeds the limit of 5 images']
    },
    stock: {
        type: Number,
        default: 1
        // required: true
    },
    sizes: {
        type: [String],
        required: true,
        enum: ["S", "M", "L", "XL", "XXL"],
    },
    discount: {
        type: Number,
        // default: []
        // required: true
    },
    rating: {
        type: Number,
        // required: true,
        min: 0,
        max: 5,
        default: 0
    },
    reviews_count: {
        type: Number,
        default: 0
        // required: true
    },
    //     createDate:{
    // type:String,
    // // default:
    //     }
}, { versionKey: false, timestamps: true })


export default mongoose.model("products", ProductSchema)

