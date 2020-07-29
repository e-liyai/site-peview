const jwt = require('jsonwebtoken')

const config = require('../../config')
const { responseHelper, constants } = require('../utils')

module.exports = (req, res, next) => {
  const auth = req.headers.authorization

  if (!auth) {
    responseHelper(res, { message: constants.AUTHENTICATION_MISSING }, 403)
    return
  }

  const [, authToken] = auth.split(' ')

  if (!authToken) {
    responseHelper(res, { message: constants.AUTHENTICATION_TOKEN_MISSING }, 403)
    return
  }

  let payload
  try {
    payload = jwt.verify(authToken, config.secret)
  } catch (e) {
    responseHelper(res, { message: constants.AUTHENTICATION_TOKEN_ERROR }, 403)
    return
  }

  if (!payload.username) {
    responseHelper(res, { message: constants.AUTHENTICATION_TOKEN_ERROR }, 403)
  }
  req.username = payload.username
  next()
}
