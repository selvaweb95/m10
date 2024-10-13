const brandDB= require('../db/brand');

async function getBrands(){
    const brands =await brandDB.find()
    return brands
}

async function getbrandById(id){
   const brand = await brandDB.findById(id);
   return brand
}

async function addBrand(body) {
   const brand= new brandDB({
        name:body.name
    })
    await brand.save()
    return brand
}

async function updateByIdbrand(id,body){
    const brand = await brandDB.findByIdAndUpdate(id,body,{new:true})
    return brand
}

async function deleteBrand(id){
    const brand = await brandDB.findByIdAndDelete(id);
    return brand
}

module.exports = {getBrands,getbrandById,addBrand,updateByIdbrand,deleteBrand    }

