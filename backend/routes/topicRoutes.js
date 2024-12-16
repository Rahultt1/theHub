const express = require('express');
const {
    createTopic,
    getAllTopics,
    addDiscussion,
    addComment, // Import the new controller function
} = require('../controllers/topicController');
const {Router} = require("express");

const router = express.Router();

// Route to create a topic
router.post('/topics', createTopic);

// Route to fetch all topics
router.get('/topics', getAllTopics);

// Route to add a discussion under a topic
router.post('/topics/discussions', addDiscussion);

router.post('/topics/discussions/comments', addComment);

module.exports = router;