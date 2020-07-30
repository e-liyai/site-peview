const Sequelize = require('sequelize')

const User = require('./user')
const Files = require('./files')

const { dbURL } = require('../../config')

const sequelize = new Sequelize(dbURL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})
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
