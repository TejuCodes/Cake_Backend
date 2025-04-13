require('dotenv').config();  // Load environment variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Database connection setup
const errorHandler = require('./middlewares/errorHandler');  // Custom error handler

// Import route files
const feedbackRoutes = require('./routes/feedbackRoutes'); // Feedback routes
const authRoutes = require('./routes/authRoutes');  // Authentication routes
const orderRoutes = require('./routes/orderRoutes');  // Order routes

const app = express();

// Connect to the database
connectDB();

// Middlewares
app.use(cors({ origin: "https://cake-frontend-seven.vercel.app" }));  // Enable CORS
app.use(express.json());    // Parse incoming JSON data

// Routes
app.use('/api/auth', authRoutes);      // Authentication routes
app.use('/api/orders', orderRoutes);   // Order routes
app.use('/api/feedback', feedbackRoutes); // Feedback routes

// Error handler
app.use(errorHandler);  // Catch all errors

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
