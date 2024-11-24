import orderModal from "../models/orderModal";


const orderStatusUpdateMiddleware = async (req, res, next) => {
    // const {orderId,newStatus} = req.body

    let orderId = "177ukW_G"
    let newStatus = "Pending"

    // Define valid statuses
    const validStatuses = ["Pending", "Shipped", "Delivered", "Cancel"];


    if (!validStatuses.includes(newStatus)) {
        console.error("Invalid status provided");
    }

    if (!orderId) {

        res.send({
            orderId:"oder id not provided"
        })

        next()
    }

    try {
        
        const statusResult = await orderModal.updateMany(
            { "_id": orderId, "orderProduct.status": "pending" },
            { $set: { "orderProduct.$.status": newStatus } }
        )




        next()

    } catch (error) {
        
    }



}