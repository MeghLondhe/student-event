const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllEvents, registerForEvent, getMyRegistrations } = require('../controllers/studentController');

// Student dashboard: get all events
router.get('/events', protect, getAllEvents);

// Register for an event
router.post('/register', protect, registerForEvent);

// Get student's own registrations
router.get('/my-registrations', protect, getMyRegistrations);

module.exports = router;
