import userModel from "../../models/userModel.js";
import session from "express-session"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";
import { loginUser } from "../../firebase/auth.js";


export const signIn = async (req, res) => {
  try {

    const { email, password } = req.body;

    // loginUser(email,password)

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(500).send({ success: false, message: "user not exgisted" })
    }

    const userPasswordcheck = await password === user.password;

    if (!userPasswordcheck) {
      return res.status(500).send({ success: false, message: "user password not match" })
    } 

    if (userPasswordcheck && user.roll === 34) {
      return res.status(201).send({
        success: true,
        isAdmin: true,
        user
      })
    }

    if (userPasswordcheck && user.roll === 0) {
      return res.status(201).send({
        success: true,
        isAdmin: false,
        user
      })
    } else {
      return res.status(500).send({ success: false, message: "user not login" })
    }

  } catch (error) {
    return res.status(500).send({ success: false, message: "signin errer" }, error);
  }
}



// const a = ()=>{
//   const { email, password } = req.body;

//   const user = await userModel.findOne({ email });

//   if (!user) {
//     return res.status(404).send({
//       success: false,
//       Message: "Email is not registered",
//     });
//   }


//   passport.use(
//     new LocalStrategy(
//       async function (email, password, done) {
//         const use = user.find(user => user.email === email)

//         if (!use) {
//           return done(null, false, { message: "increat email" })
//         }
//         if (!use.password !== password) {
//           return done(null, false, { message: "increat email" })
//         }
//         return done(null, use)
//       }
//     ))



//   // Serialize user into the session
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   // Deserialize user from the session
//   passport.deserializeUser((id, done) => {
//     const usere = user.find(user => user.id === id);
//     done(null, usere);
//   });



// // Authenticate the user
// passport.authenticate('local', (err, user, info) => {
// if (err) {
//   return res.status(500).send({ success: false, message: err.message });
// }
// if (!user) {
//   return res.status(401).send({ success: false, message: info.message });
// }
// req.logIn(user, (err) => {
//   if (err) {
//     return res.status(500).send({ success: false, message: err.message });
//   }
//   return res.status(200).send({ success: true, message: "Logged in successfully" });
// });
// })(req, res);

// }