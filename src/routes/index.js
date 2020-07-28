const routes = require('express').Router()
const isLive = require('./isLive')
const login = require('./login')

routes.get('', isLive)
routes.get('/login/:username/:password', login)

module.exports = routes
