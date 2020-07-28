const secret = process.env.APP_SECRET
const env = process.env.NODE_ENV
const pathVersion = '/api/v1/'

const config = env => {
  let configOutput
  const dbConfig = {
    database: process.env.DATABASE,
    dbUser: process.env.DATABASE_USER,
    dbPassword: process.env.DATABASE_PASSWORD,
    dbDialect: {
      dialect: 'postgres'
    }
  }
  switch (env) {
    case 'development':
      configOutput = {
        port: process.env.APP_PORT || 5000,
        secret,
        pathVersion,
        ...dbConfig
      }
      break
    case 'production':
      configOutput = {
        port: process.env.APP_PORT,
        secret,
        pathVersion,
        ...dbConfig
      }
      break
    default:
      configOutput = {
        pathVersion, secret, ...dbConfig
      }
  }
  return configOutput
}

module.exports = config(env)
