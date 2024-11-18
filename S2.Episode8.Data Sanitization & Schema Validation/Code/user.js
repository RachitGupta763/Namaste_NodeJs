const mongoose=require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:50,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Inalid Email");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password");
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value.lowercase)){
                throw new Error("Gender not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain",

        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Inalid Photo URL");
            }
        }

    },
    about:{
        type:String,
        default:"This is your default about you"
    },
    skills:{
        type:[String],
    }
    
},{
    timestamps:true,
});

module.exports=mongoose.model("User",userSchema);