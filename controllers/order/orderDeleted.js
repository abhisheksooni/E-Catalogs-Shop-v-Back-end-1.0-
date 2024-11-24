import orderModal from "../../models/orderModal.js"

export  const orderDeleted = async (req,res) =>{

    
    const productId = req.params.productId
    const userId = req.params.userId

// console.log(userId,productId);


const findUser = await orderModal.findOneAndUpdate(
    {userId},
    { $pull: { orderProduct: { productId: productId } } },
    {new:true}
)

res.status(200).send(
    {
        status:true,
        message:"Delete susu",
        findUser
    }
)

}


