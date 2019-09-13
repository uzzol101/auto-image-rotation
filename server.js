const express = require('express')
const app = express()
const port = 4000
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'upload/' })
const cors = require('cors')
const fs = require('fs')
app.use(cors())



app.get('/', (req, res) => res.send('Hello World!'))
app.post('/upload', upload.single('sampleFile'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.send({message:"file uploaded"})
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))