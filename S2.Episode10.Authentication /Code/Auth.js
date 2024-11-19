const User = require("../models/user");

const jwt = require("jsonwebtoken");


const userAuth = async (req,res,next)=>{
    
    try{

    const {token} = req.cookies;

    if(!token){
        throw new Error("Invalid Token !!!!");
    }
    const msg = await jwt.verify(token,"DevTinder@Rachitgpt2001");
    
    const {_id} = msg;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("Invalid User");
    }
    req.user=user;
        next();
    }catch(err){
        res.status(400).send("Error : "+err.message);
    }
}

module.exports = {userAuth};
