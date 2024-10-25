const express=require("express");
const { adminAuth } = require("./Middleware/Auth");

const app=express();

// playing with multiple routing
app.use("/user" , 
    (req,res,next) =>{
    console.log("Request Handler 1");
    next();
    },
    [(req,res,next) =>{
        console.log("Request Handler 2");
        next();
    },
    (req,res,next) =>{
        console.log("Request Handler 3");
        next();
    }],
    (req,res) =>{
        console.log("Another request Handler ");
        res.send("HANDLER");
    }
);

app.use("/user" , (req,res) =>{
    console.log("Another request Handler ");
    res.send("HANDLER");
});

app.use("/user" , (req,res,next) =>{
    console.log("Another request Handler ");
    next();
});




// Method 1 to handle Authentication

app.get("/admin/getAllData",(req,res) =>{
    const token='xyz';
    const isAdmin = token==='xyz';
    if(!isAdmin){
        res.status(401).send('Unauthorize Access');
    }
    else{
        res.send("All Data Send SuccessFully") ;
    }
});

app.delete("/admin/deleteAllData",(req,res) =>{
    const token='xyzw';
    const isAdmin = token==='xyz';
    if(!isAdmin){
        res.status(401).send('Unauthorize Access');
    }
    else{
        res.send("All Data deleted SuccessFully") ;
    }
});




// Method 2 to handle Authentication

app.use("/admin" ,(req,res,next)=>{
    const token='xyz';
    const isAdmin = token==='xyz';
    console.log("Handle Authentication");
    if(!isAdmin){
        res.status(401).send('Unauthorize Access');
    }
    else{
        next();
    }
});
app.get("/admin/getAllData",(req,res) =>{
    res.send("All Data Send SuccessFully") ;
});

app.delete("/admin/deleteAllData",(req,res) =>{
        res.send("All Data deleted SuccessFully") ;
});





// Method 3 to handle Authentication

app.use("/admin" ,adminAuth);

app.get("/admin/getAllData",(req,res) =>{
    res.send("All Data Send SuccessFully") ;
});

app.delete("/admin/deleteAllData",(req,res) =>{
        res.send("All Data deleted SuccessFully") ;
});








// This is method 1 to deal with error.

app.get("/getAllData",(req,res,) =>{
    throw new Error("hello");
    res.send("Data Send Successfully");
    
});

// This should only handle error if there were error before of this logic.

app.use("/",(err,req,res,next) =>{
    if(err){
        res.status(501).send("Something Went Wrong");
    }
})

// This is method 2 to handle error and this is most efficient way to deal with error using try catch block

app.get("/getAllData",(req,res) =>{
    try{
        throw new Error("Hello");
        res.send("data send successfully");
    }  
    catch(err){
        res.status(502).send("Some Error Occured");
    } 
});

app.listen(7771,()=>{
    console.log("Sever is running at Port 7771");
});
