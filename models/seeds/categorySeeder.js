const Category = require('../category')

RecordList = require('./record.json')

const db = require('../../config/mongoose')

//連線成功
db.once('open', () => {
  for (let i = 0; i < RecordList.results.length; i++) {
    Category.create({
      name: RecordList.results[i].name,
      icon: RecordList.results[i].icon
    })
  }
  console.log('Category Done')
})