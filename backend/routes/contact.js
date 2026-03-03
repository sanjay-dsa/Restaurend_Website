const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');

// Public routes
router.post('/', contactController.createContactInquiry);

// Admin routes
router.get('/', auth, contactController.getAllInquiries);
router.get('/:id', auth, contactController.getInquiry);
router.patch('/:id/respond', auth, contactController.respondToInquiry);

module.exports = router;