import productModel from "../../models/productModel.js";
import slugify from "slugify";
// Update
export const updateProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        const file = req.file
        const { price, description,title, gender, images, stock, sizes, discount } = req.body;
    
        const findProduct = await productModel.findById(id)    
        if (!findProduct) {
            return res.status(404).send({message :"Prodect not found"})
        }
    
        let thumbnailUrl = findProduct.thumbnail; // Default to existing thumbnail

        // Check if a new file was uploaded
        if (req.file) {
            // Upload the image to Cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "your_folder_name", // Optional: specify a folder in Cloudinary
            });
            thumbnailUrl = result.secure_url; // Use the Cloudinary URL
        }

        // Prepare the update object
        const updateData = {
            title,
            price,
            description,
            slug: slugify(title),
            gender,
            sizes,
            discount,
            stock,
            images,
            thumbnail: thumbnailUrl, // Update with new thumbnail URL
        };

        // Update the product
        const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: `Failed to update document with id ${id}` });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            updatedProduct,
        });
    } catch (error) {
        console.log("update product == ",error);
        res.status(500).send({
          success: false,
          message: "Error Product Update",
          error
        })
    }
    }