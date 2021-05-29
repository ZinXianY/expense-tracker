const Category = require('../category')

const CategoryList = require('./record.json').categories

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