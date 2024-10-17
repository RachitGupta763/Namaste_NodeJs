const express=require("express");

const app=express();



app.use("/contact",(req,res)=>{
    res.send("Here is contact");
});

app.use("/about",(req,res)=>{
    res.send("Here is about");
});


app.use("/",(req,res)=>{
    res.send("Hello Everyone");
});

app.listen(7771,() =>{
    console.log("Sever is running at Port 7771")
});