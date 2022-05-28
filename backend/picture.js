
const express = require('express')
const formidable = require('formidable')
const fs = require('fs')

// create an app instance
const app = express()

// body parsing to enable req.body
app.use(express.json())

// endpoint to handle formData uploads
app.post('/api/upload', (req, res) => {
  // uses npm module 'formidable' to read the formData
  const form = formidable();

  form.parse(req, (err, fields, file) => {
    if (err) {
      res.end(err);
      return;
    }

    try {
      console.log('location', JSON.parse(fields.location || {}));
      console.log('address', JSON.parse(fields.address || {}));
    }
    catch (e) {
      console.log('location and address not recieved');
    }

    // get the file, from file
    file = file.file

    // open file with 'fs' to enable it to be 
    // saved as a file
    let fileData = fs.readFileSync(file.path)
    fs.writeFileSync(__dirname + '../public/images/products' + file.name, fileData)

    res.json({ fields, file });
  });
});

// serve /www folder to let clients read from uploads
app.use(express.static(__dirname + '../public'))

app.listen(3040, () => console.log('Server started on http://localhost:3040'))