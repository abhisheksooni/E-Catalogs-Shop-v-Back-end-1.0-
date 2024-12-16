import userModel from "../models/userModel.js";
import session from "express-session"
import passport from "passport"
import  LocalStrategy  from "passport-local";

export const passportConfig = (passport) => {

    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            console.log(username,password);
            
            const user = await userModel.findOne({ username:username })

            if (!user) {
                return done(null, false)
            }
            if (user.password !== password) return done(null, false);

            return done(null, user)

        } catch (error) {
            console.log("passportjs config", error);
            return done(error, false)
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })


    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    })


}
