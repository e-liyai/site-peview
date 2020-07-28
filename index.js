const config = require('./config')

const app = require('./src/app')

app.listen(config.port, () => {
  console.log('-----------------------------------------------')
  console.log(`|      RUNNING ON ${config.port}`)
  console.log('-----------------------------------------------')
})
