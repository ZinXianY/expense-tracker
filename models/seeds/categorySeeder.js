const Category = require('../category')

const db = require('../../config/mongoose')

const CategoryList = require('./record.json')

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