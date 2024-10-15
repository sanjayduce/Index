const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');

// Create a new product listing
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all product listings
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update product status to mark as purchased
router.put('/:productId/buy', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by ID and update its status or relevant fields
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: { status: 'purchased' } }, // Updatethe status or relevant fields here
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error buying product:', error);
    res.status(500).json({ message: 'An error occurred while buying the product' });
  }
});
module.exports = router;