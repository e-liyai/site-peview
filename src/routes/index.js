const routes = require('express').Router()

const isLive = require('./isLive')
const login = require('./login')
const parse = require('./parse')
const upload = require('./upload')
const { authenticate } = require('../middleware')

routes.get('', isLive)
routes.get('/login/:username/:password', login)
routes.get('/parse/:url*', authenticate, parse)
routes.post('/upload', authenticate, upload)

module.exports = routes
