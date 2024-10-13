const jwt= require("jsonwebtoken");
const user = require("../db/user");

function verifyToken(req,res,next){
    const token = req.header('Authorization');
    // console.log('header token',req.header);
    
    if(!token){
      return  res.status(401).send({
            error:"access denied"
        })
    }
    try{
        const decode=jwt.verify(token,"seceret");
        // console.log(decode);
        req.user=decode;
        next()
    }catch(err){
        return res.status(401).send({
            message:"invalid token",
            error:err
        })
    }
}

function isAdmin(req,res,next){
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        return res.status(403).send({
            error:"Forbiddent"
        })
    }
}

module.exports = {verifyToken,isAdmin}

