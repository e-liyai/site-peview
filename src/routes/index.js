const routes = require('express').Router()

const isLive = require('./isLive')
const login = require('./login')
const parse = require('./parse')
const upload = require('./upload')
const download = require('./download')
const userInfo = require('./userInfo')
const { authenticate } = require('../middleware')

routes.get('', isLive)
routes.get('/login/:username/:password', login)
routes.get('/user/:username', authenticate, userInfo)
routes.get('/parse/:url*', authenticate, parse)
routes.post('/upload', authenticate, upload)
routes.get('/download/:path*', authenticate, download)

module.exports = routes
