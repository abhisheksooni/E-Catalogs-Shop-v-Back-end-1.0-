import productModel from "../../models/productModel.js";

// Get one Product
export const getOneProduct = async (req,res)=>{
try {
    const {slug} = req.params.slug

    const product = await productModel.findOne({slug:req.params.slug})

    res.status(200).send({
        success:true,
        message:"get one Product",
        product
    })

} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error get one Product",
        error
    })
}
}