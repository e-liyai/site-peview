/* eslint-disable camelcase */
const path = require('path')
const cloudinary = require('cloudinary').v2
const multer = require('multer')

const {
  cloud_name, cloud_api_key, cloud_api_secret
} = require('../../config')

cloudinary.config({
  cloud_name,
  api_key: cloud_api_key,
  api_secret: cloud_api_secret
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/../uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

module.exports = {
  cloudinary,
  storage
}
