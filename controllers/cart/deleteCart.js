import addToCartModal from "../../models/addToCartModal.js";



export const deleteOneCart = async (req, res) => {
    try {

        const  userId  = req.params.userId; // Destructure userId from params
        const productId  = req.params.productId; // Assuming you're passing the product id to delete

        const findUser = await addToCartModal.find({userId})
     
        if (findUser) {
            const ress =  await addToCartModal.findOneAndDelete({productId})
          
        }

    
       return res.status(200).send({
            message: "ok",
            
        })


    } catch (error) {
        console.log("deleteOneCart  => ", error);
        return res.status(500).send({
            success: false,
            message: "Error Find User add to carts"
        })
    }
}