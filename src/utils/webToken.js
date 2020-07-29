const jwt = require('jsonwebtoken')

const config = require('../../config')

const webToken = (data) => {
  return jwt.sign(data, config.secret, { expiresIn: '24h' })
}

module.exports = {
  webToken
}
