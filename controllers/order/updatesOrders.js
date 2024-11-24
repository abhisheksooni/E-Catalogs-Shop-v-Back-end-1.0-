import orderModal from "../../models/orderModal.js";


export const updateOrders = async (req, res) => {

    const { userId, productId, orderId, status } = req.body


    try {

        const order = orderModal.findByIdAndUpdate({ _id: orderId }, { status })



        res.status(201).json({
            success: true,
            message: " update orders:",
            order
        });


    } catch (error) {
        console.error("Error update orders:", error);
        res.status(500).json({
            success: false,
            message: "Error update orders:",
            error: error.message,
        });
    }
}