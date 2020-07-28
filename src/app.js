const express = require('express')

const config = require('../config')
const routes = require('./routes')
const { logger } = require('./utils')

const app = express()
app.use(logger)
app.use(express.json())
app.use(config.pathVersion, routes)

module.exports = app
