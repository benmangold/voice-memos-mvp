let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/memos')

let db = mongoose.connection;

db.on('error', () => console.log('mongoose connection error'))

db.once('open', () => console.log('mongoose connection successful'))

let memoSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  title: String,
  url: String,
  deleted: Boolean
})

let Memo = mongoose.model('Memo', memoSchema)

const addMemo = (title, url) => {
  console.log('ADDING MEMO');
  console.log (`${title} ${url}`)
  Memo.collection.insert({ title: title, url: url, deleted: false });
}

const getMemos = (cb) => {
  Memo.collection.find({}).toArray( (err, coll) => {
    if (err) cb(err, null)
    console.log('FOUND MEMOS')
    console.log(coll);
    cb(null, JSON.stringify(coll));
  })
}

module.exports.addMemo = addMemo;
module.exports.getMemos = getMemos;