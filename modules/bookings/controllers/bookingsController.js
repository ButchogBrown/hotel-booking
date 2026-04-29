const { default: axios } = require("axios")
const { processGetGuestById } = require('../functions/guests')
const { processGetRoomById } = require('../functions/rooms')
const validateBooking = require('./validations/bookingRequest')
const { processCreateBooking, checkRoomAvailability, processGetAllBookings, processGetBookingById, processDeleteBooking, processUpdateBooking, processGetBookingGuestById } = require('../functions/bookings')
const { weatherService } = require('../../../services/weatherService') 

exports.getAllBookings = async (req, res, next) => {
	try {
		const result = await processGetAllBookings()
		return res.status(200).json(result)
	}catch(err) {
		next(err)
	}
}

exports.getBookingById = async (req, res, next) => {
  try {
		const id = req.params.id
		const result = await processGetBookingById(id)
		res.status(200).json(result)

	}catch(err) {
		next(err)
	}
}

exports.createBooking = async (req, res, next) => {
  try {
	
		// req.body.check_in = new Date(req.body.check_in)
		// req.body.check_out = new Date(req.body.check_out)
		// console.log(req.body)
		const { guest_id, room_id, check_in, check_out } = req.body
		await validateBooking.validate(req.body)
		const guest = await processGetGuestById(guest_id)
		const room = await processGetRoomById(room_id)
		const isAvailable = await checkRoomAvailability(room_id, check_in, check_out)

		if(!isAvailable) {
			const error = new Error('Room is not available for the selected dates')
			error.status = 409
			throw error
		}
		const weatherInfo = await weatherService(check_in)
		console.log(weatherInfo.time)
		const result = await processCreateBooking(req.body, weatherInfo)
		
		res.status(200).json(result)
	}catch (err) {
		console.log(err)
		next(err)
	}
}

exports.updateBooking = async (req, res, next) => {
	try {
		const status = req.body.status
		const id = req.params.id
		const result = await processUpdateBooking(status, id)

		return res.status(200).json(result)
	}catch(err) {
		next(err)
	}
}

exports.deleteBooking = async (req, res, next) => {
  try {
		const id = req.params.id
		const result = await processDeleteBooking(id)

		return res.status(200).json(result)
	}catch(err) {
		next(err)
	}
}

exports.getAllGuestById = async (req, res, next) => {
	try {
		const id = req.params.guest_id
		const result = await processGetBookingGuestById(id)

		return res.status(200).json(result)
	}catch(err) {
		next(err)
	}
}