const express=require('express');
const router=express.Router();
const {getNewProducts,getFeatureProducts, getCategories,getProductForListing, getBrands, getProductById, productFindCategory, addProduct}=require('../handlers/product-handlers')
const {addToWishlist,removeWishlist,getWishlist}= require('../handlers/wishlist-handler');
// const wishlist = require('../db/wishlist');
const {getCartlist,addToCart,removeCart,clearCart} = require('../handlers/shopping-cart-handler');
const {addOrder,getCustomerOrder}= require('../handlers/order-handlers')



router.get('/new-products',async (req,res)=>{
    const newProduct=await getNewProducts();
    res.status(200).send(newProduct)
})

router.get('/featured-products',async (req,res)=>{
    const featureProduct=await getFeatureProducts();
    res.status(200).send(featureProduct)
})

router.get('/categories',async (req,res)=>{
    const categories= await getCategories();
    res.status(200).send(categories)
})

router.get('/products',async (req,res)=>{
    const {searchProduct,categoryId,pageNum,pageSize,sortBy,sortOrder,brandId} = req.query;
    const products = await getProductForListing(searchProduct,categoryId,pageNum,pageSize,sortBy,sortOrder,brandId)
    res.status(200).send(products)
})

// brands 
router.get('/brands',async (req,res)=>{
   const brands= await getBrands();
   res.status(200).send(brands)
})

router.get('/product/:id',async (req,res)=>{
    const id=req.params.id;
    const product= await getProductById(id);
    // if(!product){
    //   return res.status(403).send("please provide valid product id");
    // }
    
    res.status(200).send(product)

})

router.get('/product/categoryId/:id',async (req,res)=>{
       const id= req.params.id;
       const ProductCategoryList=await productFindCategory(id);
       res.status(200).send(ProductCategoryList)
})

// wishlist
router.get('/wishlist/:id',async (req,res)=>{
    const userId=req.params.id
    if(userId){
        const wishlist=await getWishlist(userId)
        res.send(wishlist)
    }else{
        res.send("not added which list")
    }
    
})

// add wishlist 
router.post('/wishlist/:id',async (req,res)=>{
    const userId=req.body.userId;
    const productId=req.params.id;
    
    const wishlist= await addToWishlist(userId,productId);
    res.status(200).send(wishlist);
})

// remove wishlist 
router.delete('/wishlist/:id',async(req,res)=>{
    const id=req.body.userId
    const productId= req.params.id;
    await removeWishlist(id,productId);
    res.status(200).send({message:'deleted success fully'})
})

// cart get 
router.get('/carts/:id',async (req,res)=>{
    const userId=req.params.id;
    if(userId){
        try{
            const carts=await getCartlist(userId);
            if(!carts){
                res.status(404).send({message:'user cart not avilable'})
            }
            res.status(200).send(carts)
    
        }catch(err){
            res.status(400).send(err)
        }
    }
    else{
        res.send({
            message:'not id'
        })
    }
   
})

// cart add 

router.post('/carts/:productId',async (req,res)=>{
    const userId = req.body.userId;
    const productId= req.params.productId
    const quantity=req.body.quantity
    const cart= await addToCart(userId,productId,quantity);
    res.status(200).send(cart)
})

router.delete('/carts/:productId',async (req,res)=>{
    const userId=req.body.userId;
    const productId=req.params.productId
    const cart=await removeCart(userId,productId);
    res.status(200).send(cart)
})

// Order 

router.get('/order/:id',async (req,res)=>{
    const userId=req.params.id;
    const customerOrder=await getCustomerOrder(userId);
    res.status(200).send(customerOrder);
})

router.post('/order/:id',async (req,res)=>{
    const userId = req.params.id
    const order=req.body;
    await addOrder(userId,order);
    await clearCart(userId);
    res.status(200).send({
        message:'Oreder Created'
    })
})



module.exports=router



