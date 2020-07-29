const axios = require('axios')

const fetchWebPage = async (url) => {
  const resp = await axios({
    method: 'GET',
    url
  })
  console.log(resp.data)
}

const fetchFile = async (url) => {
  try {
    const resp = await axios({
      method: 'GET',
      url: url.href,
      responseType: 'stream'
    })
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

module.exports = {
  fetchWebPage,
  fetchFile
}
