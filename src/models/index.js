const Sequelize = require('sequelize')

const User = require('./user')

const {
  database,
  dbUser,
  dbPassword,
  dbDialect
} = require('../../config')

const sequelize = new Sequelize(database, dbUser, dbPassword, dbDialect)
const models = {
  User: User(sequelize, Sequelize)
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

module.exports = {
  sequelize,
  models
}
