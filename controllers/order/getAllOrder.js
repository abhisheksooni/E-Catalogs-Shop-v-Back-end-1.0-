    import orderModal from "../../models/orderModal.js";
import productModel from "../../models/productModel.js";

export const getAllOrders = async (req, res) => {

    const userId = req.params.userId
    try {
        const allOrders = await orderModal.find({ userId })



        // const productId = allOrders.map(items => items.orderProduct)
        //    const productId = allOrders.flatMap(order => 
        //     order.orderProduct.map(product => product.productId)
        //    )

             // Extract unique product IDs from the orders
        const productId = Array.from(new Set(allOrders.flatMap(order => 
            order.orderProduct.map(product => product.productId)
        )));

        // const orderProducts = await productModel.find({_id:productId})
        const products = await productModel.find({ _id: { $in: productId } })

        // const orderWithDetails = allOrders.map(orderItem => {
        //     const product = products.find(prod => prod._id === productId);

        //     return {
        //         ...orderItem._doc,
        //         orderDetails: product ? product : null
        //     } 
        // })


          // Fetch all products using the unique product IDs
        //   const products = await productModel.find({ _id: { $in: productId } });

        //   // Map each order to include the corresponding product details
        //   const orderWithDetails = allOrders.map(orderItem => {
        //       const orderProductsDetails = orderItem.orderProduct.map(orderProduct => {
        //           const product = products.find(prod => 
        //               prod._id.toString() === orderProduct.productId.toString()
        //           );
  
        //           return {
        //               ...orderProduct,
        //               productDetails: product || null
        //           };
        //       });
  
        //       return {
        //           ...orderItem._doc,
        //           orderProducts: orderProductsDetails
        //       }; 
        //   });


         // Create a map for quick product lookup
         const productMap = new Map(products.map(product => [product._id.toString(), product]));

         // Map each order to include the corresponding product details
         const orderWithDetails = allOrders.map(orderItem => {
             const orderProductsDetails = orderItem.orderProduct.map(orderProduct => {
                 const product = productMap.get(orderProduct.productId.toString());
                 return {
                     productId: orderProduct.productId,
                     quantity: orderProduct.quantity,
                     status:orderProduct.status,
                     productDetails:product // Only include essential details
                 };
             });
 
             return {
                 ...orderItem._doc,
                 orderProducts: orderProductsDetails
             }; 
         });


// console.log(products);

        res.status(200).json({
            success: true,
            message: "Get User Only  All orders:",
            // products,
            orderWithDetails,
            // allOrders
        });
    } catch (error) {
        console.error("Error Get All orders:", error);
        res.status(500).json({
            success: false,
            message: "Error Get All orders:",
            error: error.message,
        });
    }
}