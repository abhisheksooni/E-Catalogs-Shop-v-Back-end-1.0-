import orderModal from "../../models/orderModal.js"
import productModel from "../../models/productModel.js"


export const adminGetAllOrders = async (req, res) => {


const {updateStatusProductId,newStatus} = req.body

// let updateStatusProductId = "5641839729"
// let newStatus = "Delivered"



  // Define valid statuses
  const validStatuses = ["Pending","Shipped", "Delivered", "Cancel"];


    try {

       

        // Fetch all orders
        const allOrders = await orderModal.find({});

        // Extract all product IDs from the orders
        const productIds = allOrders.flatMap(order => 
            order.orderProduct.map(product => product.productId)
        );

        // Fetch products that match the extracted product IDs
        const products = await productModel.find({_id:{$in:productIds}})




        if (updateStatusProductId) {
            await Promise.all(allOrders.map(async (order) => {
                const updatedOrderProducts = order.orderProduct.map(orderProduct => {
                    if (orderProduct.productId.toString() === updateStatusProductId) {
                        orderProduct.status = newStatus; // Update status
                    }
                    return orderProduct;
                });

                // Update the order in the database
                await orderModal.findByIdAndUpdate(order._id, { orderProduct: updatedOrderProducts });
            }));
        }



        // Map through all orders to add product details
        const orderWithDetails = allOrders.map(order=>{
            const orderDetail = order.orderProduct.map(orderProduct=>{
                let product = products.find(prod=>prod._id.toString()===orderProduct.productId.toString())
                return{
                    
                    productId: orderProduct.productId,
                    quantity: orderProduct.quantity,
                    status:orderProduct.status,
                    orderDetails: product ? product : null
            }
            })
            // return orderDetail
            return{
                ...order._doc,
                orderProduct:orderDetail
            }
        })

// Function to format the date
const formatData = (isoString)=>{

    const date = new Date(isoString)

    return date.toLocaleString("en-IN",{
        year:"numeric",
        month:"2-digit",
        day:"2-digit",
        hour:"numeric",
        minute:"numeric",
        hour12: true,
        timeZone: 'Asia/Kolkata' // Set the time zone to IST
    }).replace(',', ''); // Remove the comma if desired
}





// Extract the relevant details
        const adminAllOrders = orderWithDetails.map(order=>{
            return order.orderProduct.map(product=>{
                return{
                    userId:order.userId,
                    orderId:order._id,
                    status:product.status,
                    quantity: product.quantity,
                    createdAt:formatData(order.createdAt),
                    orderDetails: product.orderDetails,
                }
            })
        }).flat();


            res.status(200).send({
                success: true,
                message: "Admin Get All orders:",
                adminAllOrders
            });
    } catch (error) {
        console.error(" Admin Error Get All orders:", error);
        res.status(500).json({
            success: false,
            message: "Admin Error Get All orders:",
            error: error.message,
        });
    }
}






// const productId = allOrders.map(items => items.orderProduct.map(i=>i.productId))

// const productId2 = allOrders.map(items=>{
//     const orderProducts = items.orderProduct
    
//     return(
//         orderProducts.map(i=>i.productId)
//     )
// })



// console.log(productId2);

//         // const orderProducts = await productModel.find({ _id: productId })
//         // const orderProducts = await productModel.find()



//         const products = await productModel.find({ _id: { $in: productId } })
//         const orderWithDetails = allOrders.map(orderItem => {
//             const product = products.find(prod => prod._id.toString() === orderItem.productId.toString());

//             return {
//                 ...orderItem._doc,
//                 orderDetails: product ? product : null
//             }
//         })