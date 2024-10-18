const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../handlers/product-handlers');
const multer = require('multer');
const path = require('path');
const productDB = require('../db/product')

// Get all products
router.get('', async (req, res) => {
  try {
    const products = await getAllProducts();
    
    res.status(200).send(products);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});


// Multer storage configuration for file uploads
const storage = multer.memoryStorage(); 

const upload = multer({ storage: storage });
// Add new product
router.post('', upload.array('images', 10), async (req, res) => {
  try {
    // Pass the body and the files to the addProduct function
    const product = await addProduct(req.body, req.files);

    // If no product is created, send an error
    if (!product) {
      return res.status(400).send('Product creation failed');
    }

    // Send the newly created product as the response
    res.status(201).send(product);
  } catch (err) {
    console.error('Error creating product:', err); // Log the error for debugging
    res.status(400).send('Error creating product: ' + err.message);
  }
});

// Update product
router.put('/:id',upload.array('images', 10), async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const files=req.files;
  try {
    const product = await updateProduct(id, body,files);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await deleteProduct(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});



module.exports = router;
