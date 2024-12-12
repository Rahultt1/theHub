const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// POST /api/register - Register a New User
router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;