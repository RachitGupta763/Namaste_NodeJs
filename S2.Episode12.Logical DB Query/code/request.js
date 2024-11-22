const express = require("express");
const { userAuth } = require("../Middleware/Auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/ConnectionRequest");
const { default: mongoose } = require("mongoose");
const requestRouter = express.Router();

//sending a request
requestRouter.post("/request/send/:status/:toUserId" , userAuth, async(req,res) =>{
    
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
  
        //validating our status
        const validRequest = ["ignored","interested"];
        if(!validRequest.includes(status)){
            return res.status(400).json({
                message : "Invalid Status Type " +status
            });
        }


        //find whether user is existed or not which we have send a request
        
        if(mongoose.Types.ObjectId.isValid(toUserId) ){
            const toUser = await User.findById(toUserId);
            if(!toUser){
            return res.status(404).json({
                message : "User not found"
            });
            }
             //we check whether the user already make a request or have received a request from a same preson
        const alreadyRequested = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId , toUserId:fromUserId}
            ]
        });

        if(alreadyRequested){
                return res.status(400).
                 json({
                    message : "Connection Request Already Exist"
                 })
        }

        const connect = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connect.save();

        res.status(200).json({
            message : req.user.firstName +" is " + status + " you",
            data
        })
        }
        else{
            return res.status(404).json({
                message : "User not found"
            });
        }

       
      //  res.send("request made")
    }catch(err){
        res.status(400).send("Error " + err.message );
    }

});

module.exports=requestRouter;
