const Sequelize = require('sequelize')

const User = require('./user')
const Files = require('./files')

const {
  database,
  dbUser,
  dbPassword,
  dbDialect
} = require('../../config')

console.log(database, dbUser, dbPassword, dbDialect)
const sequelize = new Sequelize(database, dbUser, dbPassword, dbDialect)
const models = {
  User: User(sequelize, Sequelize),
  Files: Files(sequelize, Sequelize)
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
