const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Handle user registration
const registerUser = async (req, res) => {
    const { firstName, lastName, username, email, dateOfBirth, gender, country, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        //Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            dateOfBirth,
            gender,
            country,
            password: hashedPassword, // Store hashed password
        });

        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};





// Handle user login
const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if user exists via username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found - Invalid Username' });
      }
  
      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid Password' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );
  
      // Respond with user data and token
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

module.exports = { loginUser , registerUser};