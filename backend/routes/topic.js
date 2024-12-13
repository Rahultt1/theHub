const express = require('express');
const { addTopic, getAllTopics } = require('../controllers/topicControllers');
const { protect } = require('../middleware/authMiddleware'); // Optional: Protect endpoints using JWT authentication

const router = express.Router();

// Add a new topic
router.post('/topics', protect, addTopic); // Use `protect` if you want authentication for adding a topic

// Get all topics
router.get('/topics', getAllTopics);

module.exports = router;