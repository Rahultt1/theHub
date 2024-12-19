const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load .env variables

/**
 * Generate a JWT Token
 * @param {Object} payload - Data to encode in the token (usually user info)
 * @returns {string} Signed JWT Token
 */
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token validity (1 day in this case)
    });
};

module.exports = { generateToken };