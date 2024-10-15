const express = require('express');
const router = express.Router();
const User = require('../models/User');

// User registration
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;