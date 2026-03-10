const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['workshop', 'hackathon', 'guest-lecture', 'tech-event', 'coding'], 
    required: true 
  },
  mode: { 
    type: String, 
    enum: ['online', 'offline'], 
    required: true 
  },
  fee: { type: Number, default: 0 },
  location: { type: String, default: '' },
  poster: { type: String, default: '' }, // new field
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
