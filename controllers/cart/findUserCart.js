import addToCartModal from "../../models/addToCartModal.js";
import productModel from "../../models/productModel.js";


export const findUserCarts = async (req, res) => {

    try {
        const userId = req.params.userId

        // const carts = await addToCartModal.find({userId})

        // const productIds = carts?.map(product => product.productId)

        // const cart = await productModel.find({_id:productIds})

        // console.log(carts);

        // return res.status(200).send({
        //     success:true,
        //     cart
        // })


        if (!userId) {
            return res.status(400).send({  // Changed status code to 400 for bad request
                success: false,
                message: "User not defined"
            });
        }

        const carts = await addToCartModal.find({ userId });

        if (!carts.length) {
            return res.status(404).send({
                success: false,
                message: "No items in the cart"
            });
        }

        const productIds = carts.map(product => product.productId);

        const products = await productModel.find({ _id: { $in: productIds } }); // Using $in for better query

        const cartWithDetails = carts.map(cartItem => {
            const product = products.find(prod => prod._id.toString() === cartItem.productId.toString());
            return {
                ...cartItem._doc,  // spread the cart item data
                productDetails: product ? product : null // include product details
            };
        });


        return res.status(200).send({
            success: true,
            cart: cartWithDetails,
            // totalCost:totalCost
        });





    } catch (error) {
        console.log("Find User add to carts  => ", error);
        return res.status(500).send({
            success: false,
            message: "Error Find User add to carts"
        })
    }
}