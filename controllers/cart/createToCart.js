import addToCartModal from "../../models/addToCartModal.js"

export const createCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId) {
            return res.status(500).send({
                success: false,
                message: "user Not defaind"
            })
        }
        if (!productId) {
            return res.status(500).send({
                success: false,
                message: "product Not defaind"
            })
        }



        const user = await addToCartModal.find({ userId })

        const productIds = user?.map(product => product.productId)

        if (productIds.find(id => id === productId)) {

            // console.log("add +1");
            const cart = await addToCartModal.findOneAndUpdate({ userId, productId },
                { $inc: { quantity } },)
            return res.status(201).send({
                success: true,
                message: "Add to cart +1",

            })
        } else {
            // console.log("add 1");
            const cart = await addToCartModal.create({
                userId,
                productId,
                quantity,
            })
            return res.status(201).send({
                success: true,
                message: "Add to cart 1"
            })
        }


    } catch (error) {
        console.log("add to cart create => ", error);
        return res.status(500).send({
            success: false,
            message: "Error addTocart create"
        })
    }
}