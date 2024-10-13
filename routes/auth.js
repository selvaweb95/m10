const express=require("express");
const { registerUser,loginUser } = require("../handlers/auth-handles");
const router=express.Router();

router.post('/register',async (req,res)=>{
    const body=req.body;
    if(body.name && body.password && body.email){
       await registerUser(body)
       res.status(200).send({message:"user register success fully"})
    }else{
        res.status(400).send({
            error:"please provide name, email and password"
        })
    }
})

// login 
router.post('/login',async (req,res)=>{
   const body=req.body;
   if(body.email && body.password){
    const user=await loginUser(body);
    if(!user){
        res.status(400).send("email or password incorrect")
    }
    res.status(200).send(user)
   }
   else{
    res.status(400).send({
        message:'please send email and password'
    })
   }
})

module.exports = router