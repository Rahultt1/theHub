const User = require('../models/User');
const { generateToken } = require('../config/jwtConfig');
const bcrypt = require('bcryptjs');

// User Registration
const registerUser = async (req, res) => {
    const {
        firstName,
        lastName,
        username,
        email,
        dateOfBirth,
        gender,
        country,
        password,
    } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists. Use a different email or username.' });
        }

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            dateOfBirth,
            gender,
            country,
            password,
        });

        await newUser.save();

        // Generate a JWT Token for the user
        const token = generateToken({ id: newUser._id, email: newUser.email });

        res.status(201).json({
            message: 'User registered successfully!',
            token, // JWT token is sent to the client
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Generate a JWT Token for the user
        const token = generateToken({ id: user._id, username: user.username });

        // Send token and user data to the frontend
        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { registerUser, loginUser };