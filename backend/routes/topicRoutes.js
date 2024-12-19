const express = require('express');
const { createTopic, getAllTopics, addDiscussion, addComment } = require('../controllers/topicController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/topics', createTopic);
router.get('/topics', getAllTopics);
router.post('/topics/discussions', protect, addDiscussion);
router.post('/topics/discussions/comments', protect, addComment);

module.exports = router; 