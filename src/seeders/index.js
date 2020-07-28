const { sequelize, models } = require('../models')
const sha256 = require('js-sha256')

const createUsers = async () => {
  await sequelize.sync()
  await models.User.create({
    username: 'test_user',
    password: sha256('password')
  })
}

createUsers()
