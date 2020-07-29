const {
  responseHelper,
  constants
} = require('../utils')

module.exports = (req, res) => {
  responseHelper(res, { status: constants.IS_LIVE })
}
