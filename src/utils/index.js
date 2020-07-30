const { webToken } = require('./webToken')
const { responseFile, response } = require('./response')
const constants = require('./constants')
const logger = require('./logger')
const fetchWebPage = require('./fetchWebPage')
const { cloudinary } = require('./cloudinary')

module.exports = {
  constants,
  logger,
  cloudinary,
  responseFile,
  fetch: fetchWebPage,
  webToken,
  responseHelper: response
}
