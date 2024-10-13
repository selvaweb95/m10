const mongoose =require('mongoose');
const brandSchema= new mongoose.Schema({
    name:String
})

const brnad= mongoose.model('brands',brandSchema);

module.exports = brnad;
