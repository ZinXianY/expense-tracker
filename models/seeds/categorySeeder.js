const Category = require('../category')

const RecordList = require('./record.json')

const db = require('../../config/mongoose')


const type = [
  {
    name: '家居物業',
    icon: 'fas fa-home'
  },
  {
    name: '交通出行',
    icon: 'fas fa-shuttle-van'
  },
  {
    name: '休閒娛樂',
    icon: 'fas fa-grin-beam'
  },
  {
    name: '餐飲食品',
    icon: 'fas fa-utensils'
  },
  {
    name: '其他',
    icon: 'fas fa-pen'
  }
]


//連線成功
db.once('open', () => {
  Category.create(type)
    .then(() => {
      console.log('Category Done')
      return db.close()
    })
    .then(() => {
      console.log('database connection close')
    })
})