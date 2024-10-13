const express = require('express');
const router = express.Router();
const { getBrands, getbrandById, addBrand, updateByIdbrand, deleteBrand } = require('../handlers/brand-handlers')

// get all brands 
router.get('', async (req, res) => {
    try {
        const brands = await getBrands();
        res.status(200).send(brands);
    } catch (err) {
        res.status(404).send(err)
    }
})

// get brand by id 

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const brand = await getbrandById(id);
        if (!brand) {
            return res.status(200).send(brand)
        }
        res.status(200).send(brand)
    } catch (err) {
        res.status(404).send(err)
    }
})

// add brand 
router.post('', async (req, res) => {
    const body = req.body;
    try {
        const brand = await addBrand(body);
        if (!brand) {
            res.status(404).send('not created');
        }
        res.status(200).send(brand)
    } catch (err) {
        res.status(500).send(err)
    }
})

// update brand by id 
router.put('/:id',async(req,res)=>{
   const id= req.params.id;
   const body=req.body;
   try{
    const brand=await updateByIdbrand(id,body);
    if(!brand){
       return res.status(404).send({status:false,message:'not correct id'})
    }
    res.status(200).send(brand)
   }catch(err){
    res.status(500).send(err)
   }
})

// delete brands

router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        const brand=await deleteBrand(id);
        res.status(200).send(brand)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router




