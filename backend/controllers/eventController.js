const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, type, mode, fee, location } = req.body;
    const poster = req.file ? req.file.path : ''; // save uploaded poster

    const event = await Event.create({
      title,
      description,
      date,
      time,
      type,
      mode,
      fee,
      location,
      poster,
      createdBy: req.user._id
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Export other controllers similarly
const getEvents = async (req, res) => {
  const events = await Event.find().populate('createdBy', 'userName email');
  res.json(events);
};

const updateEvent = async (req, res) => { /* similar to createEvent */ };
const deleteEvent = async (req, res) => { /* remove from DB */ };

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };
