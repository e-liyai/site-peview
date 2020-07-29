const { webToken } = require('./webToken')
const { responseFile, response } = require('./response')
const constants = require('./constants')
const logger = require('./logger')
const fetchWebPage = require('./fetchWebPage')
const { storage, cloudinary } = require('./cloudinary')

module.exports = {
  constants,
  logger,
  storage,
  cloudinary,
  responseFile,
  fetch: fetchWebPage,
  webToken,
  responseHelper: response
}
