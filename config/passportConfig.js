import userModel from "../models/userModel.js";
import session from "express-session"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";

export const passportConfig = (passport) => {

    passport.use(new LocalStrategy(
        async (email, password, done) => {

            try {
                const user = await userModel.findOne({ email })

                if (!user) {
                    return done(null, false, { message: "no user with that email" })
                }

                // const isMatch = await user.comparePassword(password);
                const isMatch = user.password == password
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }


            } catch (error) {
                return done(err);
            }
        }
    ));

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })


    passport.deserializeUser(async(id,done)=>{
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    })

}