const mongoose = require('mongoose');

// MongoDB-ku connect pannum function
const connectDB = async () => {
  try {
    // Environment variable-la URI iruntha adha use pannu, illana local DB-ku connect aagu
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cake_shop', {
      useNewUrlParser: true,      // New URL parser use pannu
      useUnifiedTopology: true    // New topology engine use pannu
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);  // App-a close pannu error varuthu
  }
};

module.exports = connectDB;
