const express = require('express')
const app = express()
const port = 4000
const crypto = require('crypto')
const path = require('path')
const multer  = require('multer')
var storage = multer.diskStorage({
  destination: './upload/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})
const upload = multer({storage})
const cors = require('cors')
const fs = require('fs')
app.use(cors())


app.get('/', (req, res) => res.send('Hello World!'))
app.post('/upload', upload.single('sampleFile'), function (req, res, next) {
  console.log('here isfile ', req.file)
    res.send({message:"file uploaded"})
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))