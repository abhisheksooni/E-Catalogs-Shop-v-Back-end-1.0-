import userModel from "../../models/userModel.js";
import session from "express-session"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";

export const signIn = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(500).send({ success: false, message: "User does not exist" })
    }

    const userPasswordcheck = await password === user.password;

    if (!userPasswordcheck) {
      return res.status(500).send({ success: false, message: "Invaild password" })
    } 

    if (userPasswordcheck && user.roll === 34) {
       res.status(201).send({
        success: true,
        isAdmin: true,
        user
      })
    } else if (userPasswordcheck && user.roll === 0) {
       res.status(201).send({
        success: true,
        isAdmin: false,
        user
      })
    } else {
      return res.status(500).send({ success: false, message: "User role is not vaild" })
    }

  } catch (error) {
    return res.status(500).send({ success: false, message: "An error occurred during sign in" }, error);
  }
}

