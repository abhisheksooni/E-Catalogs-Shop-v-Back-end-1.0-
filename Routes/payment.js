import express from "express"
import { Cashfree } from "cashfree-pg";
import { nanoid } from "nanoid"
const router = express.Router();

Cashfree.XClientId = "TEST1034462624299044a9235de8dd8762644301";
Cashfree.XClientSecret = "cfsk_ma_test_0933fce5d0ac81df835f88b50a4d6328_8db70960";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;





// get one product
router.post("/pay", async (req, res) => {

    const { userName, userId, userNumber, userEmail, orderAmount, orderId, } = req.body

    try {
        let request = {
            "order_amount": orderAmount, //  price
            "order_currency": "INR",
            "order_id": nanoid(10),
            "customer_details": {
                "customer_id": userId,
                "customer_name": userName,
                "customer_phone": userNumber,
                "customer_email": userEmail,

            },

        }
        // "order_meta": {
        //     "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}"
        // }

        Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {

            res.status(200).json({
                message: "Order Created successfully",
                data: response.data
            })

            // console.log('Order Created successfully:');

        }).catch((error) => {
            console.error('Error:', error);

        })



    } catch (error) {
        console.log("Payment Error : ", error);

    }
})


router.post("/verify", async (req, res) => {

    try {
        const { orderId, cf_payment_id } = req.body

  // Check if cf_payment_id is missing
  if (!cf_payment_id) {
    return res.status(400).json({
        message: "Missing cf_payment_id parameter"
    });
}

// Log the values for debugging
console.log("Received orderId:", orderId);
console.log("Received cf_payment_id:", cf_payment_id);

// Call Cashfree API to verify the payment using cf_payment_id
const response = await Cashfree.PGOrderFetchPayment("2023-08-01", cf_payment_id);

// Send the response to the client
return res.status(200).json({
    message: "Payment verification successful",
    data: response.data // Assuming response contains the necessary data
});
    } catch (error) {

    }
})



export default router