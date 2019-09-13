const express = require('express')
const app = express()
const port = 4000
const path = require('path')
const fileUpload = require('express-fileupload')

app.use(fileUpload())


app.get('/', (req, res) => res.send('Hello World!'))
app.post('/upload', (req, res) => {
    console.log(req.files);
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(path.join(__dirname, 'upload'), function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))