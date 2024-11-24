import multer from "multer";
import productModel from "../../models/productModel.js";
// Get All Products
export const getAllProducts = async (req, res) => {

    const gender = req.params.gender
    // const sizes = req.params.sizes
    const sizes = "XXL"

    try {
     if (gender === "All" || !gender) {
            const products = await productModel.find()
            return res.status(200).send({
                success: true,
                countTotal: products.length,
                message: "get All Product",
                products
            })
        }
        else if (gender) {

            const products = await productModel.find({ gender })

            return res.status(200).send({
                success: true,
                countTotal: products.length,
                message: "get All Males Product",
                products
            })
        }

        if (sizes==="XXL") {

            
            const products = await productModel.find()

            return res.status(200).send({
                success: true,
                countTotal: products.length,
                message: "get All Males Product",
                products
            })
        }



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error get All Product",
            error
        })

    }
}