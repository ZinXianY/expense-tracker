// env環境變數放入種子資料
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const CategoryList = require('./record.json')
const db = require('../../config/mongoose')

//連線成功
db.once('open', () => {
  Category.create(CategoryList.categories)
    .then(() => {
      console.log('Category Done')
      return db.close()
    })
    .then(() => {
      console.log('database connection close')
    })
})