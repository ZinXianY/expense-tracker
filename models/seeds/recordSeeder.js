const bcrypt = require('bcryptjs')
// env環境變數放入種子資料
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const RecordList = require('./record.json').results
const userSeeds = require('./record.json').userSeeds
const db = require('../../config/mongoose')

//連線成功
db.once('open', () => {
  Promise.all(Array.from(userSeeds, async (userSeed) => {
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(userSeed.password, salt)
      const user = await User.create({
        name: userSeed.name,
        email: userSeed.email,
        password: hash
      })
      const userId = user._id
      for (let record of RecordList) {
        const category = await Category.findOne({ category: record.category }).lean()
        const categoryId = category._id
        await Record.create({
          name: record.name,
          category: record.category,
          date: record.date,
          amount: record.amount,
          icon: category.icon,
          userId: userId,
          categoryId: categoryId
        })
      }
    } catch (err) { console.log(err) }
  }))
    .then(() => {
      console.log('Record Done')
      process.exit()
    })
})