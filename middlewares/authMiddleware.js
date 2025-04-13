const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Token-ah header-la iruntha extract pannu
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Token-ah verify pannu
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Request-ku user details-ah attach pannu
    req.user = user;
    next();  // Next middleware-ku pogu
  } catch (err) {
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

module.exports = authMiddleware;