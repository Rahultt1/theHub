const express = require("express");
const { addDiscussion } = require("../controllers/discussionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route for adding a discussion
router.post("/discussions", protect, addDiscussion);

module.exports = router;