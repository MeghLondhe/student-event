const Event = require('../models/Event');
const Registration = require('../models/Registration');

// Get all events for student dashboard
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'userName email');
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Register for an event
const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if already registered
    const existing = await Registration.findOne({ event: eventId, student: req.user._id });
    if (existing) return res.status(400).json({ message: 'Already registered' });

    if (event.fee > 0) {
      // Paid event logic placeholder
      return res.status(400).json({ message: 'Payment required for this event (integration pending)' });
    }

    const registration = await Registration.create({
      event: eventId,
      student: req.user._id
    });

    res.status(201).json({ message: 'Registered successfully', registration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user._id })
      .populate('event');
    res.status(200).json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAllEvents, registerForEvent, getMyRegistrations };
