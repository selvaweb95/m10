const mongoose= require('mongoose');
const {Schema}=mongoose
const cartSchema= new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,ref:'users'},
    productId:{type:Schema.Types.ObjectId,ref:'products'},
    quantity:Number 
})

const cart= mongoose.model('carts',cartSchema);

module.exports = cart;

