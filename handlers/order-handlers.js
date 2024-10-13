const orderDB= require('../db/order');

async function addOrder(userId,order) {
    console.log(userId,order);

   const orders= new orderDB({
        ...order,
        userId:userId,
        status:'inprogress'
    })
    await orders.save()
}

// get customer order 
async function getCustomerOrder(userId) {
   const order= await orderDB.find({userId:userId})
   return order
}

// get all order 
async function getAllOrder() {
   const orders= await orderDB.find();
   return orders
}

async function updateStatus(id,status){
   const orderSatus= await orderDB.findByIdAndUpdate(id,{
      status:status
   })
}
module.exports = {addOrder,getCustomerOrder,getAllOrder,updateStatus}