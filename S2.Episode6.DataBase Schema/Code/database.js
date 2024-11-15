const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.
    connect("mongodb+srv://rachitgupta763:password@cluster0.9wlc2.mongodb.net/DevTinder");

};


module.exports=connectDB;