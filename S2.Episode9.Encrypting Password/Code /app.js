const express=require("express");
const connectDB = require("./config/database");
const app=express();
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {ValidateAllField} = require("./utils/validation");
const bcrypt = require("bcrypt");
const { userAuth } = require("./Middleware/Auth");

app.use(cookieParser());
app.use(express.json());


// adding new user
app.post("/signUp" , async (req,res) =>{
    
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
app.post("/login",async(req,res) =>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email:email});

    if(!user){
        throw new Error("Invalid Credintial");
    };

     const hashPassword = user.password;
     const samePassword = await bcrypt.compare(InputPassword,hashPassword);
     
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



//get user profile
app.get("/profile",userAuth,async(req,res) =>{
    try{
    const user = req.user;

    res.send(user)

    }catch(err){
        res.status(400).send(err.msg);
    }
     

});

//send connection request
app.post("/sendConnectionRequest" , userAuth, (req,res) =>{
    
    try{
        res.send(req.user.firstName +" is sending a connection request")
    }catch(err){
        res.status(400).send("Please login to send connection request");
    }
});

//find user by email
app.get("/user", async(req,res) =>{
    const userEmail = req.body.email;

    try{
        //adding a new instance of user
        const users= await User.find({email:userEmail});
        if(users.length === 0){
            res.status(400).send("User Not Found");
        }
        else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Something went wrong");
    }

});

// feed Api - get all user 
app.get("/feed", async(req,res) =>{
      
    try{
        const allUser = await User.find({});
        res.send(allUser);
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

app.delete("/deleteUser", async(req,res) =>{
    const _id=req.body._id

    try{
        const user = await User.findByIdAndDelete({_id:_id});
        res.send("Deleted Successfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }

});

app.patch("/update/:_id", async(req,res) =>{
    const userid=req.params?._id;
    const data=req.body;
    
    
    try{
        const AllowedDatatoUpdate = [
            "photoUrl",
            "gender",
            "about",
            "age",
            "skills"
        ];

        const invalidData = Object.keys(data).every((val) =>
            AllowedDatatoUpdate.includes(val)
        );
        console.log(invalidData);

        if(!invalidData){
            throw new Error("Invalid data");
        }
        if(data?.skills?.length > 10){
            throw new Error("Skills cannot more than 10");
        }
        
        const user = await User.findByIdAndUpdate(userid,data,{
            returnDocument: "after",
            runValidators:true,
        });
        console.log(user);
        res.send("user updated Successfully");
    }catch(err){
        res.status(400).send("Error :" + err.message);
    }

})

connectDB().then(() =>{
        console.log("Database Connected Successfully");
        app.listen(7771,()=>{
            console.log("Sever is running at Port 7771");
        });
    })
    .catch((err) =>{
        console.log("Database Connected Unsuccessfully");
    })




