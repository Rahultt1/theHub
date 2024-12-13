const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Topic name, must be unique
  description: { type: String, default: '' }, // Optional description
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('Topic', TopicSchema);