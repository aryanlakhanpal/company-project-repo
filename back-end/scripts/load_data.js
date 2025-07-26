const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Product = require('../models/product.model');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function loadData() {
    try {
        // 1. Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connection successful.');

        // Optional: Clear existing data
        await Product.deleteMany({});
        console.log('🗑️  Existing products cleared.');

        const results = [];
        const csvFilePath = path.resolve(__dirname, '../data/products.csv');

        // 2. Read and Parse CSV
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (data) => {
                // Map CSV columns to your schema fields
                const productData = {
                    productId: data.product_id, // Ensure column names match your CSV
                    name: data.product_name,
                    price: parseFloat(data.price),
                    description: data.description,
                    category: data.category,
                    stock: parseInt(data.stock, 10)
                };
                results.push(productData);
            })
            .on('end', async () => {
                // 3. Insert data into the database
                if (results.length > 0) {
                    await Product.insertMany(results);
                    console.log(`🎉 Successfully inserted ${results.length} products.`);
                } else {
                    console.log('⚠️ No data to insert.');
                }

                // 4. Disconnect from MongoDB
                await mongoose.disconnect();
                console.log('❌ MongoDB connection closed.');
            });
    } catch (error) {
        console.error('🔥 Error during data loading:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

loadData();