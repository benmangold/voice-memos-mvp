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

// audio store
app.use(express.static(path.join(__dirname,'../public')))

// client app
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/memos', (req, res) => {
  console.log('GET')
  db.getMemos((err, memoList) => {
    console.log('GOT MEMOS')
    if (err) res.status(500).send(err) 
    res.send(memoList)
  });
})

app.post('/memos',parser.json(), (req, res) => {
  console.log('POST')
  console.log(req.on('data'), (data) => {
    console.log('data stream')
    console.log(data);
  })
  console.log(req.body.audio);
  // db.addMemo(req.body.title, 'audio/Test.m4a')
  res.status(201).send()
})

// we need to parse raw 
app.post('/memos/blob',  type, (req, res) => {
  console.log('POST BLOB')
  console.log(req.body);
  console.log(req.file);

  db.addMemo(req.file.originalname, `audio/${ req.file.filename }`)
  res.status(201).send()
})

app.delete('/memos', (req, res) => {
  console.log('DELETE')
  let parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl.query.id)
  db.deleteMemo(parsedUrl.query.id, (err, updated) => {
    if (err) res.status(500).send()
    res.send(updated)
  })
})

app.listen(3000, () => {
  console.log('app is listening')
})