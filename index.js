const config = require('./config')

const { sequelize } = require('./src/models')
const app = require('./src/app')

sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log('-----------------------------------------------')
    console.log(`|      RUNNING ON ${config.port}`)
    console.log('-----------------------------------------------')
  })
})
