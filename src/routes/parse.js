const cheerio = require('cheerio')
const { fetch } = require('../utils')
const { responseHelper, constants } = require('../utils')

module.exports = async (req, res) => {
  let url = req.params.url + req.params[0]
  try {
    url = new URL(url)
  } catch (err) {
    responseHelper(res, { message: constants.INVALID_URL }, 400)
  }
  const { data, status } = await fetch.fetchWebPage(url.href)
  if (!status) {
    responseHelper(res, data, 500)
    return
  }
  const $ = cheerio.load(data)

  const getMetatag = value => $(`meta[name=${value}]`).attr('content') ||
    $(`meta[property="og:${value}"]`).attr('content')
  const getDomInfo = value => $(value).first().text()

  const sitePreview = {
    title: getMetatag('title') || getDomInfo('title'),
    favicon: $('link[rel*="icon"]').attr('href'),
    snippet: getMetatag('description'),
    'large-image': getMetatag('image') || $('img').first().attr('src')
  }
  responseHelper(res, sitePreview)
}
