import productModel from "../../models/productModel.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Delete
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const find = await productModel.findById({ _id: id })
    // console.log(find.cloudinary_id);

    if (find.cloudinary_id) {
      await cloudinary.uploader.destroy(find.cloudinary_id, () => {
        console.log(find.cloudinary_id);
      })
    }
    const findProduct = await productModel.findByIdAndDelete(id)
    // const findProduct = await productModel.findByIdAndDelete(id)
    // const findProducts = await productModel.
    res.status(200).send({
      success: true,
      message: "Product Delete Successfully"

    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Product Delete",
      error
    })
  }
}