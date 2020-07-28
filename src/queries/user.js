const { models } = require('../models')

const authenticate = async (username, password) => {
  return models.User.findByLogin(username, password)
}

module.exports = {
  authenticate
}
