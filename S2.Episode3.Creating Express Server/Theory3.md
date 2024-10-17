## Creating Our Express Server


### Install Express.
`-> npm install express` 

### Create Server.
`-> const express = require("express");`

`   const app = express();`

`   app.use("/",(req,res) =>{`
`      res.send("Server Created");`  
`   });`

`   app.listen(3000,()=>{`
`      console.log("Server running at port 3000");`
`   });` 

### Install Nodemon and Add to scripts inside package.json.
`-> npm install -g nodemon`
`   scripts{`
`      "start": "node src/app.js",`
`      "dev": "nodemon src/app.js"`
`   };` 

### What is the use of -g while installing nodemon??
`-> We use '-g' to install nodemon globally to our system path.`

### What is the difference between Caret and Tilde??
-> Tilde (~) notation
    
    The tilde (~) notation is employed to match the latest patch version while freezing the major and minor versions. This notation is useful for automatically accepting bug fixes, considering that patch updates primarily address bugs.

    Example: The ~1.2.0 will update all the future patch updates. We have to write just ~1.2.0 and all the next patch update dependencies. For example, 1.2.1, 1.2.2, 1.2.5……………1.2.x.
    Note: Patch updates are very small security changes in a package that is why the ~version is approximately equivalent to the version.

    Use ~ when you want to avoid minor version updates but still receive patch updates for bug fixes.`


-> Caret (^) notation
   
    It automatically updates both minor and patch updates.

    Example: The ^1.2.4 will update all the future Minor and patch updates, for example, ^1.2.4 will automatically change the dependency to 1.x.x if any update occurs. 
    Using caret notation it is important to look at our code regularly if it is compatible with the newest version or not.

    Use ^ when you want to allow minor updates that may add features but avoid major updates that could introduce breaking changes.
