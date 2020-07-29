module.exports = {
  USER_NOT_FOUND: 'username and password provided doesn\'t exist',
  INTERNAL_ERROR: 'something went wrong, internal server error',
  AUTHENTICATION_MISSING: 'request missing authorization header',
  AUTHENTICATION_TOKEN_MISSING: 'request missing token in authorization header',
  AUTHENTICATION_TOKEN_ERROR: 'invalid token provided',
  INVALID_URL: 'invalid url provided, please provide full URL and try again.',
  EXTERNAL_ERROR: 'external server error. cloud service failed to provide file, please try again later',
  CLOUDINARY_LIMITATIONS: 'this service uses cloudinary to store files, which has limitations on PDFs and Archive files. \
    These files will be stored but cannot be retrieved, please user image file to test data retrival/download'
}
