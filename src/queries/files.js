const { models } = require('../models')

const getFile = async (fileName) => {
  return models.Files.findOne({ where: { file: fileName } })
}

module.exports = {
  getFile
}
