const validator = require("validator");

const ValidateAllField = (req) =>{

    const {firstName,lastName,email,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name should be present");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong");
    }

};

const validInputData = (req) =>{
    const AllowedDatatoUpdate = [
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "about",
        "age",
        "skills"
    ]

    const inputData = Object.keys(req.body).every((val) => AllowedDatatoUpdate.includes(val));

    return inputData;
}

module.exports = {ValidateAllField,validInputData};

