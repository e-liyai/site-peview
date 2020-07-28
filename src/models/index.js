const Sequelize = require('sequelize')
const {
  database,
  dbUser,
  dbPassword,
  dbDialect
} = require('../../config')

const sequelize = new Sequelize(database, dbUser, dbPassword, dbDialect)

const models = {
  User: sequelize.import('./user')
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export default models
