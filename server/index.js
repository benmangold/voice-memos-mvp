const express = require('express');
const path = require('path');

let app = express();

app.use(express.static(path.join(__dirname,'../public')))
app.use(express.static(__dirname + '/../react-client/dist'));


app.listen(3000, () => {
  console.log('app is listening')
})