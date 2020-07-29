const multer = require('multer')
const fs = require('fs')

const { user } = require('../queries')
const { models } = require('../models')

const {
  storage,
  cloudinary,
  responseHelper
} = require('../utils')

module.exports = async (req, res, next) => {
  const upload = multer({ storage }).single('file')
  let fileResponse = null
  await upload(req, res, async (err) => {
    if (err) {
      responseHelper(res, err, 500)
      return
    }

    const path = req.file.path
    const uniqueFilename = new Date().toISOString()

    try {
      await cloudinary.uploader.upload(
        path,
        { public_id: `files/${uniqueFilename}`, tags: 'files' },
        function (err, file) {
          if (err) return responseHelper(res, err, 500)
          fs.unlinkSync(path)
          fileResponse = file
        }
      )
      console.log(cloudinary.url(`${uniqueFilename}.${fileResponse.format}`, { resource_type: 'raw' }))
      const dbUser = await user.getUser(req.username)
      await models.Files.create({
        userId: dbUser.id,
        file: fileResponse.secure_url
      })
      responseHelper(res, { file: fileResponse })
    } catch (err) {
      responseHelper(res, err, 500)
    }
  })
}
