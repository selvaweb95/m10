const express = require('express');
const {getAllOrder,updateStatus}= require('../handlers/order-handlers')
const router = express.Router();

router.get('',async (req,res)=>{
    const orders=await getAllOrder();
    res.status(200).send(orders);
})
router.post('/:id',async (req,res)=>{
    const id=req.params.id;
    const status=req.body.status;
    const orderStatus= await updateStatus(id,status);
    res.status(200).send({message:'updated successfully'})
})

module.exports = router