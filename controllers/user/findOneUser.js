import userModel from "../../models/userModel.js";


export const findUser = async (req,res)=>{

try {
    const {name,email} = req.body;


    const findUser = userModel.findOne({})



} catch (error) {
    console.log("Error Find One User == ",error);
    res.status(500).send({
        success:true,
        message:"Error findOneUser",
        error
    })
    
}


}