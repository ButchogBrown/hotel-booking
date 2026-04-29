const express = require('express')
const router = express.Router()

const bookingsRoutes = require('../modules/bookings/routers/bookingsRouter')
const guestsRoutes = require('../modules/bookings/routers/guestsRouter')
const roomsRoutes = require('../modules/bookings/routers/roomsRouter')
const weatherRoutes = require('../modules/bookings/routers/weatherRoutes')

router.use('/bookings', bookingsRoutes)
router.use('/rooms', roomsRoutes)
router.use('/guests', guestsRoutes)

router.use('/weathers', weatherRoutes)

module.exports = router

