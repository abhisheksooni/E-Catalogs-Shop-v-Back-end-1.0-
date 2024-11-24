import slugify from "slugify";

import userModel from "../../models/userModel.js";

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, phoneNumber, addresses } = req.body;

        const findUser = await userModel.findById({ _id: id })

        console.log(findUser);

        if (!findUser) {
            return res.status(404).send({
                message: "user not found"
            })
        }

        const updateUser = await userModel.findByIdAndUpdate(id, {
            name,
            slug: slugify(name),
            password,
            email,
            phoneNumber,
            addresses,
            pincode,
            city,
            state,
        }, { new: true })

        if (!updateUser) {
            return res.status(404).send({
                message: "user not update"
            })
        }

        return res.status(200).send({
            success: true,
            message: "User update Successfully",
            updateUser
        })

    } catch (error) {
        console.log("update user == ", error);
        res.status(500).send({
            success: false,
            message: "Error update user",
            error
        })


    }
}
