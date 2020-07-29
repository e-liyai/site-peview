const { TranslationServiceClient } = require('@google-cloud/translate')

const { parent } = require('../../config')
const {
  responseHelper,
  constants,
  fetch
} = require('../utils')

const translationServiceClient = new TranslationServiceClient()

const getSupportedLanguages = async () => {
  const reqParams = { parent }
  const [{ languages }] = await translationServiceClient.getSupportedLanguages(reqParams)
  return languages.map(language => language.languageCode)
}

const translateInstruction = async (req, res) => {
  const supportedLanguages = await getSupportedLanguages()
  responseHelper(res, {
    message: constants.TRANSLATE_INSTRUCTIONS,
    supported_languages: supportedLanguages
  })
}

const translate = async (req, res) => {
  const { language } = req.body
  if (!language) {
    responseHelper(res, { message: constants.MISSING_LANGUAGE }, 400)
    return
  }
  const supportedLanguages = await getSupportedLanguages()
  if (!supportedLanguages.includes(language)) {
    responseHelper(res, { message: constants.LANGUAGE_NOT_SUPPORTED }, 400)
    return
  }

  let url = req.params.url + req.params[0]
  try {
    url = new URL(url)
  } catch (err) {
    responseHelper(res, err, 400)
  }
  const webPage = await fetch.fetchWebPage(url.href)
  if (!webPage.status) {
    responseHelper(res, webPage.data, 500)
  }
  const reqParams = {
    parent,
    mimeType: 'text/html',
    contents: [webPage.data],
    targetLanguageCode: language
  }

  try {
    const [response] = await translationServiceClient.translateText(reqParams)

    for (const translation of response.translations) {
      res.set('Content-Type', 'text/html')
      responseHelper(res, translation.translatedText)
      break
    }
  } catch (error) {
    console.log(error)
    responseHelper(res, error, 503)
  }
}

module.exports = {
  translateInstruction,
  translate
}
