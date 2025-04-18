const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// User register pannum function
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User already exist-a check pannu
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Password-ah hash pannu (security ku)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Puthu user-a create pannu
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });

  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// User login pannum function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User-ah find pannu
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Password correct-a-nu check pannu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // JWT token generate pannu (1 day validity)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Password-ah response-la kaanama remove pannu
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({
      success: true,
      token,
      user: userWithoutPassword
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { register, login };