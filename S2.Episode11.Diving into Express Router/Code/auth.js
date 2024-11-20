const express=require("express");
const { ValidateAllField } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// adding new user
authRouter.post("/signUp" , async (req,res) =>{
    
    const {firstName,lastName,email,password} = req.body;

    try{
        //validate a user
        ValidateAllField(req);

        const requireData=["firstName","lastName","email","password"];

        const invalidData = Object.keys(req.body).every((val) =>
            requireData.includes(val)
        );
        if(!invalidData){
            throw new Error("Invalid Data");
        }

        //encrypt a password
        const newPassword= await bcrypt.hash(password,10);

        const user = new User({
            firstName,
            lastName,
            email,
            password:newPassword
        });
        await user.save();
        res.send("User Added Successfully");
    }catch(err){
        res.status(400).send("Error in adding user" + err.message);
    }
    
});

// login api
authRouter.post("/login",async(req,res) =>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email:email});

    if(!user){
        throw new Error("Invalid Credintial");
    };

    const samePassword = user.validatePassword(password);

    if(samePassword){
        const token = await jwt.sign({_id:user._id},"DevTinder@Rachitgpt2001",{
            expiresIn:"7d"
        });

        res.cookie("token",token,{
            expires:new Date(Date.now() + 8*360000)
        });
        res.send("Login Successful!!!!");
    }
    else{
        throw new Error("Invalid Credintial");
    }

    }catch(err){
        res.status(400).send(err.message);
    }
});

authRouter.post("/logout",(req,res) =>{
    res.
    cookie("token",null,{
        expires:new Date(Date.now())
    })
    .send("Logout Successfully");
})

module.exports = authRouter;

