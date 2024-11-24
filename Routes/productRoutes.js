import express from "express"


import { createProduct } from "../controllers/products/createProduct.js";
import { updateProduct } from "../controllers/products/updateProduct.js"
import { getAllProducts } from "../controllers/products/allProducts.js";
import { getOneProduct } from "../controllers/products/oneProdect.js";
import { deleteProduct } from "../controllers/products/deleteProduct.js";
import { upload } from "../controllers/products/utils/multer.js";



const router = express.Router();

//  create Product  ,
// router.post("/create",upload.array("thumbnail"), createProduct)
router.post("/create",upload.array("imagesArrey",5), createProduct)
// router.post("/create",upload.array("imagesArrey",5),(req,res)=>{
//     // console.log(req.files);
//     const file = req.file
//     const files = req.files
//     // console.log(file);
    
//     const { price, description,title, gender,thumbnail, images, stock, sizes, discount } = req.body;
//     // console.log("file",file);
//     // console.log("price",price);
//     // console.log("description",description);
//     // console.log("title",title);
//     // console.log("gender",gender);
//     // console.log("images",images);
//     //  console.log("images",images);
//     // console.log("stock",stock);
//     // console.log("sizes",sizes);
//     // console.log("discount",discount);

//     let data = {
//         "title":title,
//         "thumbnail":thumbnail,
//         // "file":Array.isArray(files) ? files.map((i) => i.name) : [],
//         "file": files?files:[],
//         "price":price,
//         "description":description,
//         "gender":gender,
//         "stock":stock,
//         "sizes":sizes,
//     }



//     res.send({mages:"data send",data})
    
// } )
//  Update Product
router.put("/update/:id",upload.single("thumbnail"), updateProduct) 
// delete Product
router.delete("/delete/:id", deleteProduct)
// get all Product
router.get("/products/:gender", getAllProducts)
// get one product
router.get("/product/:slug", getOneProduct)



export default router