const Datauri = require('datauri/parser')
const path = require('path')

const { user } = require('../queries')
const { models } = require('../models')

const {
  cloudinary,
  responseHelper,
  constants
} = require('../utils')

module.exports = async (req, res) => {
  if (req.file) {
    try {
      const dataURI = new Datauri()
      const data = req => dataURI.format(path.extname(req.file.originalname).toString(), req.file.buffer)
      const file = data(req).content
      const result = await cloudinary.uploader.upload(file)

      const dbUser = await user.getUser(req.username)
      await models.Files.create({
        userId: dbUser.id,
        url: result.secure_url,
        filename: req.file.originalname
      })
      responseHelper(res, {
        file: result,
        NOTE: constants.CLOUDINARY_LIMITATIONS
      })
    } catch (err) {
      responseHelper(res, err, 500)
    }
  } else {
    responseHelper(res, { message: constants.INTERNAL_ERROR }, 500)
  }
}
