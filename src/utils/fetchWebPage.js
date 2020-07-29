const axios = require('axios')

const makeAxiosCall = async (url, stream = false) => {
  try {
    let params = {
      method: 'GET',
      url
    }
    if (stream) {
      params = { ...params, responseType: 'stream' }
    }
    const resp = await axios(params)
    return {
      status: true,
      data: resp.data
    }
  } catch (err) {
    return {
      status: false,
      data: err
    }
  }
}

const fetchWebPage = async (url) => {
  return makeAxiosCall(url)
}

const fetchFile = async (url) => {
  return makeAxiosCall(url, true)
}

module.exports = {
  fetchWebPage,
  fetchFile
}
