const express=require("express");

const connectDB = require("./config/database");
const app=express();
const User = require("./models/user")

connectDB().then(() =>{
        console.log("Database Connected Successfully");
        app.listen(7771,()=>{
            console.log("Sever is running at Port 7771");
        });
    })
    .catch((err) =>{
        console.log("Database Connected Unsuccessfully");
    })

