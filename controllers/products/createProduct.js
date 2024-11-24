import productModel from "../../models/productModel.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import { upload } from "./utils/multer.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create
export const createProduct = async (req, res) => {
  try {
    const { price, description, title, gender, stock, sizes, discount } =
      req.body;

    // File Upload
    const file = req.file; // Thumbnail
    const files = req.files; // Additional Images

    // Check if the main thumbnail file exists
    // if (!file) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Thumbnail file is required",
    //   });
    // }

    // console.log("files",files);
    // upload Thumbnail and Additional imgaes
    // const thumbnailUpload = await cloudinary.uploader.upload(files.path, {
    //   folder: "catalog-v1-e-shop",
    // });

   
    
  
    const uploadFiles = files.map((filef) => {
      return cloudinary.uploader
        .upload(filef.path, { folder: "catalog-v1-e-shop/images" })
        .then((result) => {
          fs.unlink(filef.path, (err) => {
            if (err) {
              console.log(err);
            }
          });

          return { secure_url: result.secure_url, public_id: result.public_id };
        });
    });
    
    // // Wait for all uploads to complete
    const imageUrls = await Promise.all(uploadFiles);
    
    // console.log("imageUrls",imageUrls);
    console.log("imageUrls",imageUrls);
    // Create product in the database
    const product = await productModel.create({
      title,
      price,
      slug: title ? slugify(title) : "",
      gender,
      description,
      stock,
      sizes,
      discount: discount ? discount : 0,
      images: imageUrls.map(i=>i.secure_url),
      cloudinary_ids:imageUrls.map(i=>i.public_id),
      // thumbnail: thumbnailUpload.secure_url, // Use the secure URL of the uploaded thumbnail
      // cloudinary_id: thumbnailUpload.public_id, // Store the Cloudinary ID for the thumbnail
    });

    // Respond with success message
    return res.status(201).send({
      success: true,
      message: "Product created successfully",
      // product,
    });
  } catch (error) {
    console.log("Product creation error: ", error);
    return res.status(500).send({
      success: false,
      message: "Error creating product",
      error: error.message, // Send a more user-friendly error message
    });
  }
};

// const promise = async () => {

//     const result = await cloudinary.uploader.upload(file.path, { folder: "catalog-v1-e-shop" })

//     const uploadFiles = files.map(filef => {
//         return cloudinary.uploader.upload(filef.path, { folder: `catalog-v1-e-shop/images` })
//             .then(result => {
//                 fs.unlink(files.path, (err) => {
//                     if (err) {
//                         console.error(err);
//                     }
//                 });
//                 return result.secure_url;
//             })
//     })

//     // Wait for all uploads to complete
//     const imageUrls = await Promise.all(uploadFiles);

//     const product = await productModel.create({
//         title,
//         price,
//         slug: title ? slugify(title) : "",
//         gender,
//         description,
//         stock,
//         sizes,
//         discount,
//         thumbnail,
//         images: imageUrls,
//         cloudinary_id: result.public_id,
//         // cloudinary_ids: files.map(filess => filess.filename),

//     })

//     // Delete temporary file after upload
//     // fs.unlink(files.path, (err) => {
//     //     if (err) {
//     //         console.error(err);
//     //     }
//     // });

// }
// return res.status(201).send({
//     success: true,
//     message: "Create New Product",
//     product
// })

// const product = await productModel.create({
//     title,
//     price,
//     slug: title?slugify(title):"",
//     gender,
//     description,
//     stock,
//     sizes,
//     discount,
//     thumbnail:"addimagae",
//     images:["1","2","3","4"],
//     // cloudinary_id: result.public_id,
//     // cloudinary_ids: files.map(filess=>filess.filename),

// })

// return res.status(201).send({
//     success: true,
//     message: "Create New Product",
//     product
// })
