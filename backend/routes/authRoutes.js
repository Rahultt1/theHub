const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Registration Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// Protected Route Example
router.get('/protected', protect, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});

module.exports = router;