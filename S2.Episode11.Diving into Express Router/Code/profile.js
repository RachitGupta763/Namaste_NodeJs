const jwt = require("jsonwebtoken");
const express=require("express");
const { userAuth } = require("../Middleware/Auth");
const { validInputData } = require("../utils/validation");
const User = require("../models/user");

const profileRouter = express.Router();


profileRouter.get("/profile/view",userAuth,async(req,res) =>{
    try{
    const user = req.user;

    res.send(user)

    }catch(err){
        res.status(400).send(err.msg);
    }
     
});

profileRouter.patch("/profile/edit",userAuth,async(req,res) =>{

    try{
        if(!validInputData){
            throw new Error("Invalid Field to Edit");
        }
        
        
        if(req?.body?.skills?.length >10){
            throw new Error("Skills can not more than 10");
        } 

        //Method 1 to update
        // const _id= req.user._id;
        // await User.findByIdAndUpdate(_id,req.body,{
        //                 returnDocument: "after",
        //                 runValidators:true,
        //             });

        //Method 2 to update

        const loginUser = req.user;

        Object.keys(req.body).forEach((key) =>(loginUser[key]=req.body[key]));
        loginUser.save();
        console.log(loginUser);
        res.send("User data is Updated");  
    }catch(err){
        res.status(400).send("ERORR: "+err.message)
    }          
    
})

module.exports =profileRouter;