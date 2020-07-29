const { models } = require('../models')

const authenticate = async (username, password) => {
  return models.User.findByLogin(username, password)
}

const getUser = async (username) => {
  return models.User.findOne({
    where: { username },
    include: [{ model: models.Files }]
  })
}

module.exports = {
  authenticate,
  getUser
}
