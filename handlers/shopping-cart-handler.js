const cartDB=require('../db/cart');

async function getCartlist(userId) {
    const cart= await cartDB.find({userId:userId}).populate('productId');
    console.log('get cat items',cart);
    
    return cart.map(val => {
      const formatImage = {
        ...val.productId._doc,
        images: val.productId.images.map(img => ({
            contentType: img.contentType,
            data: img.data.toString('base64')  // Convert buffer to Base64
        }))
    }
      return {quantity:val.quantity,product:formatImage}
    } )
}

async function addToCart(userId,productId,quantity) {
  // console.log('bbb',userId,productId,quantity);
  const product=await cartDB.findOne({userId:userId,productId:productId});  
  if(product){
    const productCartUpdated= await cartDB.findByIdAndUpdate(product._id,{
        quantity:product.quantity + quantity
       })
    return productCartUpdated 
  }
  else{
    const newCart= new cartDB({
        userId:userId,
        productId:productId,
        quantity:quantity
    })

    await newCart.save()
    return newCart
  }
}

async function removeCart(userId,productId) {
   const cart= await cartDB.findOneAndDelete({userId:userId,productId:productId});
   return cart
}

async function clearCart(userId) {
    await cartDB.deleteMany({userId:userId})
}

module.exports = {getCartlist,addToCart,removeCart,clearCart}