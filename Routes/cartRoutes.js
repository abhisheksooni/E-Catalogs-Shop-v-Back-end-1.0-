import express from "express"
import { createCart } from "../controllers/cart/createToCart.js";
import { findUserCarts } from "../controllers/cart/findUserCart.js";
import { deleteOneCart } from "../controllers/cart/deleteCart.js";

const rouder = express.Router();

// Get user Carts
rouder.post("/carts/:userId",findUserCarts)
// User user Cart
rouder.post("/create",createCart)
// delete user Carts
rouder.delete("/delete/:userId/:productId",deleteOneCart)


export default rouder