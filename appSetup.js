const express = require('express')
const cors = require('cors')
const routes = require('./routers/bookingsRouter.js')
const { errorHandler } = require('./middlewares/errorHandler.js')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', routes)

app.use(errorHandler)

module.exports = app