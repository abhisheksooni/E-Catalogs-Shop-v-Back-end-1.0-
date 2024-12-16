import express from "express"   
import session from "express-session"
import passport from "passport"

import {signUp} from "../controllers/auth/signUp.js"
import {signIn} from "../controllers/auth/signIn.js"
import {updateUser} from "../controllers/auth/updateUser.js"
import {forgotPasswordUser} from "../controllers/auth/forgotPassword.js"
import {findUser} from "../controllers/user/findOneUser.js"
import { findUsers } from "../controllers/user/findAllUsers.js"


const router = express.Router();


// sign-in user
// router.post("/sign-in",passport.authenticate("local",{failureRedirect:"/sign-up"}),(req,res)=>{
//   res.send(req.user)
// })
// router.post("/sign-in",signIn)
router.post("/sign-in",signIn)





// sign-up user
router.post("/sign-up",signUp)
//  update user
router.put("/update/:id",updateUser)
// forgotPassword user
router.post("/forgotPassword",forgotPasswordUser)
// find one user
router.post("/find/:slug",findUser)
router.get("/users",findUsers)

// Profile route (protected)
router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
      res.send(`Hello ${req.user.username}`);
  } else {
      res.redirect('/auth/login');
  }
});


 export default router