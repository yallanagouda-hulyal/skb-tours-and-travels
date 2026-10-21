const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingByRef,
} = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:reference', getBookingByRef);

module.exports = router;
