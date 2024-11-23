const express=require("express");
const connectDB = require("./config/database");
const app=express();
 
const cookieParser = require("cookie-parser");
const requestRouter = require("./router/request");
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const userRouter = require("./router/user")


app.use(cookieParser());
app.use(express.json());


app.use("/",authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);
app.use("/",userRouter);


connectDB().then(() =>{
        console.log("Database Connected Successfully");
        app.listen(7771,()=>{
            console.log("Sever is running at Port 7771");
        });
    })
    .catch((err) =>{
        console.log("Database Connected Unsuccessfully");
    })


