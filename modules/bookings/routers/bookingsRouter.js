const express = require('express')
const router = express.Router()
const { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking, getAllGuestById } = require('../controllers/bookingsController')

router.get('/', getAllBookings)
router.get('/:id', getBookingById)
router.post('/', createBooking)
router.patch('/:id', updateBooking)
router.delete('/:id', deleteBooking)
router.get('/guests/:guest_id', getAllGuestById)
module.exports = router