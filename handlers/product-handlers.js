const productDB = require('../db/product')
const categorySchema = require('../db/category');
const brandDB = require('../db/brand');
const fs = require('fs');
const path = require('path');

async function getAllProducts() {
    const products = await productDB.find();
    // Transform images to base64 only
    const formattedProducts = products.map(product => ({
        ...product._doc,  // Spread other product properties
        images: product.images.map(img => ({
            contentType: img.contentType,
            data: img.data.toString('base64')  // Convert buffer to Base64
        }))
    }));

    return formattedProducts
}



// get product by id 
async function getProductById(id) {
    const product = await productDB.findById(id);
    const formatImage = {
        ...product._doc,
        images: product.images.map(img => ({
            contentType: img.contentType,
            data: img.data.toString('base64')  // Convert buffer to Base64
        }))
    }

    return formatImage
}

// create product 
async function addProduct(body, files) {
    // console.log(body);  // Other form fields
    // console.log(files); // Uploaded files


    const imageArray = files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype
    }));

    // Process the uploaded images if any
    // const imagePaths = files.map(file => 'http://localhost:3000/uploads/' + file.filename);

    // Create a new product object with body fields and image paths
    const product = new productDB({
        ...body,
        images: imageArray // Save the image paths in the images field
    });

    // Save the product to the database
    await product.save();
    return product;
}

// update product 
async function updateProduct(id, body, files) {
    console.log('updateProduct', body);  // Other form fields
    console.log('updateProduct files', files); // Uploaded files
    const imageArray = files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype
    }));
    const datas = {
        ...body,
        images: imageArray
    }
    const product = await productDB.findByIdAndUpdate(id, datas, { new: true });
    console.log('update finaly result', product);

    return product
}

// delete product 
async function deleteProduct(id) {
    const product = await productDB.findByIdAndDelete(id);
    return product
}
// new product
async function getNewProducts() {
    const newProduct = await productDB.find({
        isNewProduct: true
    })
    // Transform images to base64 only
    const formattedProducts = newProduct.map(product => ({
        ...product._doc,  // Spread other product properties
        images: product.images.map(img => ({
            contentType: img.contentType,
            data: img.data.toString('base64')  // Convert buffer to Base64
        }))
    }));
    return formattedProducts
    // return newProduct
}

//get feature products
async function getFeatureProducts() {
    const featureProduct = await productDB.find({ isFeatured: true });
    // Transform images to base64 only
    const formattedProducts = featureProduct.map(product => ({
        ...product._doc,  // Spread other product properties
        images: product.images.map(img => ({
            contentType: img.contentType,
            data: img.data.toString('base64')  // Convert buffer to Base64
        }))
    }));
    return formattedProducts
}

// get categories
async function getCategories() {
    const categories = await categorySchema.find();
    return categories
}

async function getBrands() {
    const brands = await brandDB.find();
    return brands
}

async function getProductForListing(searchProduct, categoryId, pageNum, pageSize, sortBy, sortOrder, brandId) {
    if (!sortBy) {
        sortBy = 'price'
    }
    if (!sortOrder) {
        sortOrder = -1;
    }
    let queryFilter = {};
    // Product.find({ name: { $regex: /^apple/, $options: 'i' } });
    if (searchProduct) {
        queryFilter.$or = [
            {
                name: { $regex: '.*' + searchProduct + '.*', $options: 'i' }
            },
            {
                shotDescription: { $regex: '.*' + searchProduct + '.*', $options: 'i' }
            },
            {
                description: { $regex: '.*' + searchProduct + '.*', $options: 'i' }
            }
        ]
    }
    if (categoryId) {
        queryFilter.categoryId = categoryId
    }
    if (brandId) {
        queryFilter.brandId = brandId
    }

    const products = await productDB.find(queryFilter)
        .sort({
            [sortBy]: +sortOrder,
        })
        .skip((+pageNum - 1) * +pageSize)
        .limit(+pageSize);
        // console.log('product list quieries',products);
         // Transform images to base64 only
     const formattedProducts = products.map(product => ({
        ...product._doc,  // Spread other product properties
        images: product.images.map(img => ({
            contentType: img.contentType,
            data: img.data.toString('base64')  // Convert buffer to Base64
        }))
    }));
    return formattedProducts
        
    // return products
}

async function productFindCategory(id) {
    const productCategory = await productDB.find({
        categoryId: id
    })
     // Transform images to base64 only
     const formattedProducts = productCategory.map(product => ({
        ...product._doc,  // Spread other product properties
        images: product.images.map(img => ({
            contentType: img.contentType,
            data: img.data.toString('base64')  // Convert buffer to Base64
        }))
    }));
    return formattedProducts

    // return productCategory
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, getNewProducts, getFeatureProducts, getCategories, getProductForListing, getBrands, productFindCategory }