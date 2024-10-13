const express= require("express");
const router = express.Router();
const categorySchema = require('../db/category');

// get all category 
router.get('',async (req,res)=>{
    try{
        const categoryList= await categorySchema.find();
        res.status(200).send({
            status:true,
            data:categoryList
        })
    }catch(err){
        res.status(404).send(err)
    }

})

// get category id 

router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    // console.log(id);
    try{
        const category=await categorySchema.findById(id);
        if(!category){
           return  res.status(404).send('id not founded')
        }
        res.status(200).send({
            status:true,
            data:category
        })
    }catch(err){
        res.status(404).status(err)
    }
})

// create 
router.post('',async (req,res)=>{
    const body=req.body;
    // console.log(body)
    const categores=categorySchema({name: body.name})
    await categores.save();
    res.send(categores.toObject()); // The .toObject() method is used in Mongoose to convert a Mongoose document into a plain JavaScript object.
})

// update 
router.put('/:id',async (req,res)=>{
    const id=req.params.id;
    const body=req.body;
    // console.log('errs1');
    try{
        const category= await categorySchema.findByIdAndUpdate(id,body,{new:true});
        if(!category){
          return res.status(201).send('category not found')
        }
        res.status(200).send(category)
    }
    catch(err){
        res.status(500).send(err)
    }
})

// delete 

router.delete('/:id',async (req,res)=>{
    const id =req.params.id;
    try{
        const categoryDelete= await categorySchema.findByIdAndDelete(id);
        if(!categoryDelete){
            return res.status(404).send('category not founded')
        }
        res.send({
            status:true,
            message:'deleted successfully',
            data:categoryDelete
        })
        

    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = router;