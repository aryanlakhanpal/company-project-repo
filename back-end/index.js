const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
require('dotenv').config();
const Product = require('./models/product.model'); // Assuming you might need it later

const app = express();
const PORT = process.env.PORT || 3001; // Changed to 3001 to avoid port conflicts

// --- Middleware ---
// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from your React app
}));
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Successfully connected to MongoDB.'))
    .catch(err => console.error('🔥 MongoDB connection error:', err));

// --- API Routes ---
app.get('/', (req, res) => {
    res.send('🤖 Conversational AI Backend is running!');
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const { message, conversationId } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    try {
        // In a real application, you would query your database or call an AI service here
        // For now, we will just echo the message back.
        // Example: const products = await Product.find({ $text: { $search: message } });
        const aiResponseText = `I received your message: "${message}". How can I help you with our products?`;

        res.json({
            response: aiResponseText,
            conversationId: conversationId || `conv_${Date.now()}`
        });
    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ error: 'Failed to process chat message.' });
    }
});

// --- Server ---
app.listen(PORT, () => {
    console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});