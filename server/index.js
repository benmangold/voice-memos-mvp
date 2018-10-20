const express = require('express');
const path = require('path');
const parser = require('body-parser')
const db = require('../db')
const url = require('url')
const multer = require('multer');
var upload = multer({ dest: __dirname + '/../public/audio/' });
var type = upload.single('upl');
const fs = require('fs');


let app = express();
// app.use(parser.json());
let jsonParser = parser.json()

// audio store
app.use(express.static(path.join(__dirname,'../public')))

// client app
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/memos', (req, res) => {
  db.getMemos((err, memoList) => {
    if (err) res.status(500).send(err) 
    res.send(memoList)
  });
})

// what to do with this? test method for crud operations
app.post('/memos/test',jsonParser, (req, res) => {
  console.log(req.body.audio);
  // db.addMemo(req.body.title, 'audio/Test.m4a')
  res.status(201).send()
})

// we need to parse raw 
app.post('/memos/blob',  type, (req, res) => {
  console.log(req.body);
  console.log(req.file);

  db.addMemo(req.file.originalname, `audio/${ req.file.filename }`, (err, data) => {
    if (err) res.status(500).send();
    res.status(201).send()
  })
})

// app.post('/memos/title', jsonParser, (req, res) => {
//   console.log('POST Update Memo Title')
//   console.log(req.body)
//   // db.updateTitle();
// })

app.delete('/memos', (req, res) => {
  let parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl.query.id)
  db.deleteMemo(parsedUrl.query.id, (err, updated) => {
    if (err) res.status(500).send()
    res.send(updated)
  })
})

app.listen(process.env.PORT || 5000, () => {
  console.log('app is listening')
})