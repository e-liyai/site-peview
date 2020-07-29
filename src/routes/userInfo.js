const { user } = require('../queries')
const {
  responseHelper,
  constants
} = require('../utils')

module.exports = async (req, res) => {
  const dbUser = await user.getUser(req.params.username)
  if (dbUser) {
    responseHelper(res, dbUser)
    return
  }
  responseHelper(res, { message: constants.USER_DETAILS_NOT_FOUND }, 404)
}
