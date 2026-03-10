const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Example protected route
router.get('/dashboard', protect, (req, res) => {
  res.json({
    message: `Welcome ${req.user.userName}! This is your dashboard.`,
    user: req.user
  });
});

module.exports = router;
