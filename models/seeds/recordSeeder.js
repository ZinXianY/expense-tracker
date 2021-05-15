const Record = require('../record')

const RecordList = require('./record.json')

const db = require('../../config/mongoose')

//連線成功
db.once('open', () => {
  for (let i = 0; i < RecordList.results.length; i++) {
    Record.create(RecordList.results[i])
  }
  console.log('Record Done')
})