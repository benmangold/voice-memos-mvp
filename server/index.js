const express = require('express');
const path = require('path');
const parser = require('body-parser')
const db = require('../db')

let app = express();
app.use(parser.json());

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

app.post('/memos', (req, res) => {
  console.log('POST')
  console.log(req.body.title)
  db.addMemo(req.body.title, 'audio/Test.m4a')
  res.status(201).send()
})

app.listen(3000, () => {
  console.log('app is listening')
})