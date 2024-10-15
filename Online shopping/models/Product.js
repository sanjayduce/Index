const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'available',
    enum: ['available', 'purchased'],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
