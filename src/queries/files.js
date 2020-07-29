const { models } = require('../models')

const getFile = async (fileUrl) => {
  return models.Files.findOne({ where: { url: fileUrl } })
}

module.exports = {
  getFile
}
