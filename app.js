import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors"
import session from "express-session"
import status from "express-status-monitor"
import jwt from "jsonwebtoken"
import connectDB from "./DataBase/database.js"
import productRoute from "./Routes/productRoutes.js"
import userRoute from "./Routes/userRoutes.js"
import cartRoutes from "./Routes/cartRoutes.js"
import orders from "./Routes/orderRouter.js"
import payment from "./Routes/payment.js"
import { passportConfig } from './config/passportConfig.js';
import LocalStrategy from "passport-local";
import userModel from "./models/userModel.js"

// google
import GoogleStrategy from "passport-google-oauth20"
import passport from "passport"

const app = express()
app.use(express.json())
dotenv.config()

// DataBase connect
connectDB()


app.use(cors())
app.use(status())


app.use("/api/v1/products", productRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/cart", cartRoutes)
app.use("/api/v1/order", orders)
app.use("/api/v1/payment", payment)


app.get("/", (req, res) => {
    res.send("WELLCOME TO API")

})


app.listen(process.env.PORT, () => console.log(colors.bgBlue(`Sever Start http://localhost:${process.env.PORT}`)))