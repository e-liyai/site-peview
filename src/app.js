
const express = require('express')
const config = require('../config')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(config.pathVersion, routes)

module.exports = app
