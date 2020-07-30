/* eslint-disable camelcase */
const cloudinary = require('cloudinary').v2

const {
  cloud_name, cloud_api_key, cloud_api_secret
} = require('../../config')

cloudinary.config({
  cloud_name,
  api_key: cloud_api_key,
  api_secret: cloud_api_secret
})

module.exports = {
  cloudinary
}
