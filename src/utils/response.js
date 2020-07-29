const responseFile = (res, filename) => {
  res.set('Content-Disposition', `attachment; filename="${filename}"`)
}

const response = (res, data, status = 200) => {
  res.status(status)
  res.send(data)
}

module.exports = {
  responseFile,
  response
}
