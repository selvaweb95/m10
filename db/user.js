const mongoose=require('mongoose');
const userSchema =new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin:Boolean
})

const user=mongoose.model('users',userSchema);

module.exports = user;