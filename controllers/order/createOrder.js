import mongoose from "mongoose";
import orderModal from "../../models/orderModal.js";



export const createOrder = async (req, res) => {

    const { userId, productId, quantity } = req.body

    //  quantity, productId
    // console.log("userId", userId);
    // console.log("req.body", req.body);
    // console.log("quantity", quantity);
    // console.log("productId", productId);


    try {

        // Create an array of products with productId and quantity
        const orderProducts = productId.map((id, index) => ({
            productId: id,
            quantity: quantity[index]
        }));

        console.log("orderProducts:", orderProducts); // Log the final order products



        const userOldOrders = await orderModal.findOne({ userId });

        // console.log("User's existing orders:", userOldOrders);

        if (!userOldOrders) {
            // If no existing orders, create a new order
            const order = await orderModal.create({
                userId,
                orderProduct: orderProducts,

            });

            return res.status(201).send({
                success: true,
                message: "Order created successfully",
                order
            });
        } else {

            const order = await orderModal.findOneAndUpdate(
                { userId },
                { $push: { orderProduct: { $each: orderProducts } } }
            )

            return res.status(201).send({
                success: true,
                message: "User already has an existing order",
                order
            });
        }

    } catch (error) {
        console.error("Error creating or updating order:", error);
        res.status(500).json({
            success: false,
            message: "Error creating or updating order",
            error: error.message,
        });
    }
}