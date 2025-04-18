const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    default: 'User'
  },
 
}, {
  timestamps: true  // createdAt and updatedAt fields automatic-a add pannu
});

module.exports = mongoose.model('User', userSchema);