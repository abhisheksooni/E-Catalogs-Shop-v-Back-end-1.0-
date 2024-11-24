import slugify from "slugify";
import userModel from "../../models/userModel.js";
import dotenv from "dotenv"
import JWT from "jsonwebtoken"
import { createUser } from "../../firebase/auth.js";

dotenv.config()




export const signUp = async (req, res) => {
    try {
        const { name, email, password, token,phoneNumber,addresses } = req.body;

        // createUser(email,password,name,phoneNumber)
        const exisitingUser = await userModel.findOne({ email })

        console.log(exisitingUser);

        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Email are already use"
            })
        }

        const user = await userModel.create({
            name:name?name:"null",
            slug: slugify(name),
            email,
            password,
            phoneNumber,
            addresses
            // token:tokenJwt
        })


        // const tokenJwt =  "as"
        const tokenJwt = await JWT.sign({ email: user.email }, process.env.JWT_SECRET)

        user.token = tokenJwt;
        await user.save();


         res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user: {
                name: user.name,
                email: user.email,
                slug: user.slug,
                token: user.token
            }
        })

    } catch (error) {
        console.log("Error Register == ", error);
         res.status(500).send({
            success: false,
            message: "Error Register Successfully"
        })
    }
}
