const { responseHelper, responseFile, constants } = require('../utils')
const { fetch } = require('../utils')
const { files } = require('../queries')

module.exports = async (req, res) => {
  let url = req.params.path + req.params[0]
  try {
    url = new URL(url)
  } catch (err) {
    responseHelper(res, err, 400)
  }
  const resp = await fetch.fetchFile(url)
  if (!resp.status) {
    responseHelper(res, { message: constants.EXTERNAL_ERROR }, 502)
    return
  }
  const file = await files.getFile(url.href)
  if (file) {
    responseFile(res, file.filename)
  }
  resp.data.pipe(res)
}
