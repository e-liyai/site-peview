# site preview :globe_with_meridians:

## Table of Contents

- [login :closed_lock_with_key:](#login)
- [get user info :man_technologist:](#userInfo)
- [parse :eyes:](#parse)
- [translate :u6e80:](#translate)
- [download :arrow_down:](#download)
- [upload :arrow_up:](#upload)

### login
This endpoint returns a JWT for use in all subsquent requests.
```
GET: ap1/v1/login/<username>/<password>
```

### userInfo
Lists user infor and all files uploaded by a user.
```
GET: ap1/v1/user/<username>
```

### parse
This endpoint returns a website preview
```
GET: ap1/v1/parse/<url>
```

### translate
perform GET request (`GET: ap1/v1/translate`) to get instraction on how to do the translate.

To performm the translate execute:
```
POST: ap1/v1/translate/<url>
``` 
with a payload that specifies the language to translate to.

### upload
uploads files to the cloud and saves file information. To retrieve the file, copy the `secure_url`(file->secure_url) value and perform a download. To list all the files uploaded, get user information.
```
POST: ap1/v1/upload

body: multipart-form with file to upload
```

> This service uses cloudinary to store files, which has limitations on PDFs and Archive files([cloudinary suppoort](https://support.cloudinary.com/hc/en-us/community/posts/360008128779-404-error-when-viewing-pdf-file)). These files will be stored but cannot be retrieved, please user image or text file to test data retrival/download. 

### download
downloads/retrieves files from the cloud.
```
GET: ap1/v1/download/<file_url>
```
