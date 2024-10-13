const wishlistDB= require('../db/wishlist');

async function addToWishlist(userId,productsId){
    // console.log(userId,productsId);
    const wishlist= new wishlistDB({
        userId:userId,
        productId:productsId
    });
    await wishlist.save();
    return wishlist
}

async function removeWishlist(userId,productsId) {
//    const wishlist= await wishlistDB.findByIdAndDelete(id);
//    return wishlist  
    const wishlist = await wishlistDB.deleteMany({
        userId:userId,
        productId:productsId
    })
    return wishlist
}

// get Wishlist 
async function getWishlist(userId) {
   const wishlist=await wishlistDB.find({userId:userId}).populate('productId')
   return wishlist.map((val)=> val.toObject().productId)
}


module.exports = {addToWishlist,removeWishlist,getWishlist}

