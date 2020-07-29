const { fetch } = require('../utils')
const { responseHelper, constants } = require('../utils')

module.exports = (req, res) => {
  let url = req.params.url + req.params[0]
  try {
    url = new URL(url)
  } catch (err) {
    responseHelper(res, { message: constants.INVALID_URL }, 400)
  }
  fetch.fetchWebPage(url)
}
