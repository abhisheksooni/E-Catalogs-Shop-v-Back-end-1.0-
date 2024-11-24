import express from "express";
import { createOrder } from "../controllers/order/createOrder.js";
import { getAllOrders } from "../controllers/order/getAllOrder.js";
import { updateOrders } from "../controllers/order/updatesOrders.js";
import { adminGetAllOrders } from "../controllers/order/adminGetAllOrders.js";
import {orderDeleted} from "../controllers/order/orderDeleted.js"


const router = express.Router()


// User Get All Order
router.get("/:userId",getAllOrders)
// user create Order
router.post("/",createOrder)
// Admin Update Order states and etc
router.put("/",updateOrders)
// Admin Get Order states and etc
router.put("/admin/all",adminGetAllOrders)
// Admin Get Order states and etc
router.delete("/admin/:userId/:productId",orderDeleted)


export default router