module.exports = (res, data, status = 200) => {
  res.status(status)
  res.send(data)
}
