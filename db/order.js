const mongoose = require("mongoose");

const orderSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    date:Date,
    cartItems:Array(mongoose.Schema.Types.Mixed),
    // cartItems:{type:mongoose.Schema.Types.ObjectId,ref:'products'},
    paymentType:String,
    address:mongoose.Schema.Types.Mixed,
    status:String
})

const order= mongoose.model('orders',orderSchema);

module.exports = order;