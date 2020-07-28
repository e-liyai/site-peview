const routes = require('express').Router()

const isLive = (req, res) => {
  res.send({ status: 'endpoint is working' })
}

routes.get('', isLive)

module.exports = routes
