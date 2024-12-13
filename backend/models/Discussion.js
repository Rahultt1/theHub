const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  subtopic: { type: String, required: true },
  question: { type: String, required: true },
  link: { type: String, default: '' },
  uploads: [
    { name: String, type: String, preview: String }, // Attach optional file upload details
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }, // Track the last time the document was updated
});

// Middleware to update "lastUpdated" before saving
DiscussionSchema.pre('save', function (next) {
  this.lastUpdated = new Date(); // Update the last updated date during save
  next();
});

// Middleware to update "lastUpdated" before updating
DiscussionSchema.pre('findOneAndUpdate', function (next) {
  this.set({ lastUpdated: new Date() }); // Update the last updated date during findOneAndUpdate
  next();
});

// Middleware to update "lastUpdated" before updateMany
DiscussionSchema.pre('updateMany', function (next) {
  this.set({ lastUpdated: new Date() }); // Update the last updated date during updateMany
  next();
});

module.exports = mongoose.model('Discussion', DiscussionSchema);