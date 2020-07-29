const axios = require('axios')

const fetchWebPage = async (url, options = {}) => {
  const resp = await axios({
    method: 'GET',
    url
  })
  console.log(resp.data)
}

module.exports = {
  fetchWebPage
}
