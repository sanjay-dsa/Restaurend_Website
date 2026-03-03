const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');

// Public routes
router.post('/', reservationController.createReservation);
router.get('/confirmation/:confirmationCode', reservationController.getReservationByCode);

// Admin routes
router.get('/', auth, reservationController.getAllReservations);
router.patch('/:id/status', auth, reservationController.updateReservationStatus);
router.delete('/:id', auth, reservationController.cancelReservation);

module.exports = router;