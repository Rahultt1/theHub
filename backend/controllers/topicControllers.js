const Topic = require('../models/Topic');

// Add a new topic
const addTopic = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Check if a topic already exists with the same name
    const existingTopic = await Topic.findOne({ name: name.toLowerCase() });
    if (existingTopic) {
      return res.status(400).json({ message: 'Topic already exists' });
    }

    // Create a new topic
    const newTopic = new Topic({
      name: name.toLowerCase(), // Store topic name in lowercase for uniqueness
      description,
    });

    const savedTopic = await newTopic.save();

    res.status(201).json({
      message: 'Topic added successfully',
      data: savedTopic,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while adding topic',
      error: error.message,
    });
  }
};

// Get all topics
const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json({
      message: 'Topics retrieved successfully',
      data: topics,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while retrieving topics',
      error: error.message,
    });
  }
};

module.exports = {
  addTopic,
  getAllTopics,
};