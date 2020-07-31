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
  const { data, status } = await fetch.fetchWebPage(url.href)
  if (!status) {
    responseHelper(res, data, 500)
  }

  const translateReqParams = (data) => {
    return {
      parent,
      mimeType: 'text/html',
      contents: [data],
      targetLanguageCode: language
    }
  }

  const chunkSubstr = (str, size) => {
    const numChunks = Math.ceil(str.length / size)
    const chunks = new Array(numChunks)

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size)
    }

    return chunks
  }

  async function asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  try {
    const dataList = chunkSubstr(data, 20000)
    const responses = []
    const translations = []
    await asyncForEach(dataList, async (dataItem) => {
      const param = translateReqParams(dataItem)
      const [response] = await translationServiceClient.translateText(param)
      responses.push(response)
    })

    for (const response of responses) {
      for (const translation of response.translations) {
        translations.push(translation.translatedText)
      }
    }
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200)
    res.end(translations.join(''))
  } catch (error) {
    console.log(error)
    responseHelper(res, error, 503)
  }
}

module.exports = {
  translateInstruction,
  translate
}
