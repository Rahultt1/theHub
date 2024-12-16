const Topic = require('../models/Topic');
const Discussion = require('../models/Discussion');



// Add a new topic to the database
const createTopic = async (req, res) => {
    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    try {
        // Check if a topic with the same title already exists
        const existingTopic = await Topic.findOne({ title });
        if (existingTopic) {
            return res.status(400).json({ message: 'Topic with the same title already exists.' });
        }

        // Create and save the new topic
        const newTopic = new Topic({
            title,
            description,
        });

        await newTopic.save();

        res.status(201).json({
            message: 'Topic created successfully!',
            topic: newTopic,
        });
    } catch (error) {
        console.error('Error creating topic:', error);
        res.status(500).json({ message: 'Server error while creating topic.' });
    }
};

module.exports = {
    createTopic,
    // ... other controllers
};


// Get a list of all topics
const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('discussions');
        res.status(200).json(topics);
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ message: 'Server error while fetching topics.' });
    }
};

// Submit a discussion under a topic
const addDiscussion = async (req, res) => {
    const { topicId, text } = req.body;

    try {
        // Find the topic by ID
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found.' });
        }

        // Create a new discussion
        const newDiscussion = new Discussion({
            text,
            topic: topic._id,
        });

        // Save the discussion
        await newDiscussion.save();

        // Link the discussion to the topic
        topic.discussions.push(newDiscussion._id);
        await topic.save();

        res.status(201).json({ message: 'Discussion added successfully!', discussion: newDiscussion });
    } catch (error) {
        console.error('Error adding discussion:', error);
        res.status(500).json({ message: 'Server error while adding discussion.' });
    }
};

// Add a comment to a discussion
const addComment = async (req, res) => {
    const { discussionId, text, author } = req.body;

    // Validate input
    if (!discussionId || !text || !author) {
        return res.status(400).json({ message: 'Discussion ID, text, and author are required.' });
    }

    try {
        // Find the discussion by ID
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found.' });
        }

        // Create a new comment and push it to the comments array
        const newComment = {
            text,
            author,
        };
        discussion.comments.push(newComment);

        // Save the updated discussion
        await discussion.save();

        res.status(201).json({
            message: 'Comment added successfully!',
            discussion,
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Server error while adding comment.' });
    }
};

module.exports = {
    createTopic,
    getAllTopics,
    addDiscussion,
    addComment, // Export the new function
};

