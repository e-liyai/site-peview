const { user } = require('../queries')
const { responseHelper, webToken, constants } = require('../utils')

module.exports = async (req, res) => {
  try {
    const { username, password } = req.params
    const userPayload = { username, password }
    const authUser = await user.authenticate(username, password)
    if (authUser) {
      const authToken = webToken(userPayload)
      userPayload.authToken = authToken
      responseHelper(res, userPayload)
    } else {
      responseHelper(res, { message: constants.USER_NOT_FOUND }, 204)
    }
  } catch (err) {
    responseHelper(res, { message: constants.INTERNAL_ERROR }, 500)
  }
}
