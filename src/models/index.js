const Sequelize = require('sequelize')

const User = require('./user')
const Files = require('./files')

const { dbURL } = require('../../config')

console.log(dbURL)
const sequelize = new Sequelize(dbURL)
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
