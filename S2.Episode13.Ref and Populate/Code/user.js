const express = require("express");
const { userAuth } = require("../Middleware/Auth");
const ConnectionRequest = require("../models/ConnectionRequest");
const userRouter = express.Router();

//get All Pending request
const UserInfo = "firstName lastName photoUrl about gender";

userRouter.get("/user/request/received" ,userAuth, async(req,res) =>{
     
     
     try{
        
        const user = req.user;

        const pendingRequest = await ConnectionRequest.find({
            toUserId:user._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName photoUrl about gender");
        //.populate("fromUserId",["firstName", "lastName", "photoUrl", "about");
        res.status(200).json({
            message:"Data fetched successfully",
            pendingRequest,
        })
     }catch(err){
        res.status(404).send("Error " + err);
     }
});


userRouter.get("/user/connections",userAuth,async(req,res) =>{

    try{
       const loggedInUser = req.user;

       const connections = await ConnectionRequest.find({
        $or:[
           {toUserId:loggedInUser,status:"accepted"},
           {fromUserId:loggedInUser,status:"accepted"},
        ] 
       }).populate("fromUserId",UserInfo).populate("toUserId",UserInfo);

       const data = connections.map((row) =>{
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
       })

       res.status(200).json({
        message:"Data fetched successfully",
        data,
    })
    }catch(err){
        res.status(404).send("Error " + err);
     }
});

module.exports=userRouter;