const Topic = require('../models/Topic');
const Discussion = require('../models/Discussion');

// Add a new topic to the database
const createTopic = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    try {
        const existingTopic = await Topic.findOne({ title });
        if (existingTopic) {
            return res.status(400).json({ message: 'Topic with the same title already exists.' });
        }

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
    const { topicId, text, author, subtopic } = req.body; // Include author and subtopic

    if (!topicId || !text) {
        return res.status(400).json({ message: 'Topic ID and text are required.' });
    }

    try {
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found.' });
        }

        const newDiscussion = new Discussion({
            text,
            topic: topic._id,
        });

        await newDiscussion.save();
        topic.discussions.push(newDiscussion._id);
        await topic.save();

        res.status(201).json({ message: 'Discussion added successfully!', discussion: newDiscussion });
    } catch (error) {
        console.error('Error adding discussion:', error);
        res.status(500).json({ message: 'Server error while adding discussion.' });
    }
};

// Add a comment to a discussion or reply to a comment
const addComment = async (req, res) => {
    const { discussionId, text, author, parentCommentId } = req.body;

    if (!discussionId || !text || !author) {
        return res.status(400).json({ message: 'Discussion ID, text, and author are required.' });
    }

    try {
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found.' });
        }

        if (parentCommentId) {
            const parentComment = discussion.comments.id(parentCommentId);
            if (!parentComment) {
                return res.status(404).json({ message: 'Parent comment not found.' });
            }

            const newReply = { text, author };
            parentComment.replies.push(newReply);
        } else {
            const newComment = { text, author };
            discussion.comments.push(newComment);
        }

        await discussion.save();

        res.status(201).json({
            message: parentCommentId ? 'Reply added successfully!' : 'Comment added successfully!',
            discussion,
        });
    } catch (error) {
        console.error('Error adding comment or reply:', error);
        res.status(500).json({ message: 'Server error while adding comment or reply.' });
    }
};

const getDiscussionsByTopic = async (req, res) => {
    const { topicId } = req.params;

    if (!topicId) {
        return res.status(400).json({ message: 'Topic ID is required.' });
    }

    try {
        const discussions = await Discussion.find({ topic: topicId }).populate('comments');
        res.status(200).json(discussions);
    } catch (error) {
        console.error('Error fetching discussions:', error);
        res.status(500).json({ message: 'Server error while fetching discussions.' });
    }
};

module.exports = {
    getDiscussionsByTopic,
    createTopic,
    getAllTopics,
    addDiscussion,
    addComment,
};