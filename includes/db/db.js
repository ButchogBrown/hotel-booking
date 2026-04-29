require('dotenv').config()
const { Pool } = require('pg')
const config = require('../config/mainConfig.js')

const pool = new Pool(config.db)

module.exports = pool