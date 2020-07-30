const routes = require('express').Router()

const isLive = require('./isLive')
const login = require('./login')
const parse = require('./parse')
const upload = require('./upload')
const download = require('./download')
const userInfo = require('./userInfo')
const { translateInstruction, translate } = require('./translate')
const { authenticate, multerUploads } = require('../middleware')

routes.get('', isLive)
routes.get('/login/:username/:password', login)
routes.get('/user/:username', authenticate, userInfo)
routes.get('/parse/:url*', authenticate, parse)
routes.post('/upload', authenticate, multerUploads, upload)
routes.get('/download/:path*', authenticate, download)
routes.get('/translate', authenticate, translateInstruction)
routes.post('/translate/:url*', authenticate, translate)

module.exports = routes
