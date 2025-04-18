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
app.use(cors({ 
  origin: "https://cake-frontend-woad.vercel.app", // Update with the correct frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow credentials (cookies, etc.)
}));  
app.use(express.json());  // Parse incoming JSON data

// Routes
app.use('/api/auth', authRoutes);      // Authentication routes
app.use('/api/orders', orderRoutes);   // Order routes
app.use('/api/feedback', feedbackRoutes); // Feedback routes

// ✅ Root route to prevent "Cannot GET /"
app.get('/', (req, res) => {
  res.send('🎂 Cake Shop API is running!');
});

// Error handler (should be placed after all routes)
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
