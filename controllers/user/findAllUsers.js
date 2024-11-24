import userModel from "../../models/userModel.js"



export const findUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(201).send({
            success: true,
            users
        })
    } catch (error) {
        console.log(error);
    }

}
