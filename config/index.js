const secret = process.env.APP_SECRET
const env = process.env.NODE_ENV
const pathVersion = '/api/v1'

const config = env => {
  let configOutput
  switch (env) {
    case 'development':
      configOutput = {
        port: process.env.APP_PORT || 5000,
        secret,
        pathVersion
      }
      break
    case 'production':
      configOutput = {
        port: process.env.APP_PORT || 5000,
        secret,
        pathVersion
      }
      break
    default:
      configOutput = {
        pathVersion, secret
      }
  }
  return configOutput
}

module.exports = config(env)
