const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const multer = require('multer');
const router = express.Router();

// Multer setup for poster uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // folder to store images
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Admin routes
router.post('/create', protect, authorize('admin'), upload.single('poster'), createEvent);
router.put('/:id', protect, authorize('admin'), upload.single('poster'), updateEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);

// Student route
router.get('/', protect, getEvents);

module.exports = router;
