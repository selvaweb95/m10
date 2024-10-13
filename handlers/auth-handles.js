const userDB = require("../db/user");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

// register 
async function registerUser(body) {
    const hashPassword =await bcrypt.hash(body.password,10)
    const user = new userDB({ 
        name: body.name, 
        email: body.email, 
        password: hashPassword
    });
    await user.save();
}

// login user 
async function loginUser(body) {
   const user=await userDB.findOne({email:body.email});
   if(!user){
        return null
   }
   const isMatched =await bcrypt.compare(body.password,user.password);
   if(isMatched){
    const token = jwt.sign({
        id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    },"seceret",{
        expiresIn:"1d"
    });
    return {token,user}
   }else{
    return null
   }
}

module.exports = {registerUser,loginUser}

