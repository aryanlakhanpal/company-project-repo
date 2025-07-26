const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, index: true }, // Indexing category for faster queries
    stock: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;