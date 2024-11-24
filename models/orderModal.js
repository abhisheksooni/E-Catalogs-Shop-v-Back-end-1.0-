import mongoose from "mongoose"
import { nanoid } from "nanoid"


const products = new mongoose.Schema({

    productId: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "products", // Reference to Product model
    },
    quantity: {
        type: Number,
        min: 1
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancel'],
        default: 'Pending',
    }
}, { _id: false })


// const addressSchema = new mongoose.Schema({
//     _id:{
//         type:String,
//         default:()=>nanoid(8)
//     },
//     pincode:{
//         type:String,
//         default:"null"
//     },
//     city:{
//         type:String,
//         default:"null"
//     },
//     address:{
//         type:String,
//         default:"null"
//     },
// },{versionKey: false})


const orderSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(8)
    },
    userId: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "users", // Reference to Product model
    },
    // userAddress:addressSchema,
    orderProduct: [products]

}, { versionKey: false, timestamps: true })


export default mongoose.model("order", orderSchema)