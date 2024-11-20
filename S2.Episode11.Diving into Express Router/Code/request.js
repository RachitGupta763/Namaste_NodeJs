const express = require("express");
const { userAuth } = require("../Middleware/Auth");

const requestRouter = express.Router();

//get user profile
requestRouter.post("/sendConnectionRequest" , userAuth, (req,res) =>{
    
    try{
        res.send(req.user.firstName +" is sending a connection request")
    }catch(err){
        res.status(400).send("Please login to send connection request");
    }

});
module.exports=requestRouter;