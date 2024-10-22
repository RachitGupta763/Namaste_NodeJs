const express=require("express");

const app=express();


// The order of writing handler is matter as -> we call "/hello" router but it will send the reponse of "/" router 
// as "/" router is written above and our srever is matches this route followed by other it simply return it. 
// to avoid it we simply define route by different names LIKE -> /Home , /About , /Contact etc no of the route start with "/" only.

app.use("/hello",(req,res)=>{
    res.send("Here is hello");
});

app.use("/hello/123",(req,res)=>{
    res.send("Here is hello/123");
});

// The reponse of above two handler is same as "/hello" is common in both.
// But the response of "/hello" and "/hello123" is different as their name is different. 
app.use("/hello123",(req,res)=>{
    res.send("Here is hello123");
});

// app.use("/",(req,res)=>{
//     res.send("Hello Everyone");
// });


app.get("/abc?d",(req,res) =>{
    res.send(" ? -> Optional Chaining that means we can use /abcd and /abd both works fine");
});

app.get("/a(bc)?d",(req,res) =>{
    res.send(" ? -> Optional Chaining that means we can use /abcd and /ad both works fine");
});



app.get("/abc+d",(req,res) =>{
    res.send(" + -> use to add 'c' as many times in routing that means we can use /abcd and /abcccccd both works fine");
});

app.get("/a(bc)+d",(req,res) =>{
    res.send(" + -> use to add 'bc' as many times in routing that means we can use /abcd and /abcbcbcd both works fine");
});


app.get("/abc*d",(req,res) =>{
    res.send(" * -> use to add any character as many times in routing that means we can use /abcd and /abcnshfjffkd both works fine");
});


//we can also use regex 
app.get(/a/,(req,res) =>{
    res.send(" a should be present in route");
});


app.get(/fly$/,(req,res) =>{
    res.send(" fly should be present at end in route");
});


app.get("/user",(req,res) =>{
    console.log(req.query);
    res.send("we use req.query to read parameter passing on url");  
});
// The result of this http://localhost:7771/user?userName=Rachit&password=1234567 is
// {userName:'Rachit' , password:'1234567'}



app.get("/user/:userId",(req,res) =>{
    console.log(req.params);
    res.send("we use req.param to handle dynamic routing");  
});


app.listen(7771,() =>{
    console.log("Sever is running at Port 7771")
});