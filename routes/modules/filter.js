//引用Express 及 Express路由器
const express = require('express')
const router = express.Router()

//引用 Record & Category model
const Record = require('../../models/record')
const Category = require('../../models/category')

//設定自動加總總金額
function total(records) {
  let sum = 0
  records.forEach((record) => {
    sum += record.amount
  })
  return sum
}

//設定 filter 路由
router.get('/', (req, res) => {
  const query = req.query.category
  Record.find({ category: query })
    .lean()
    .then((records) => {
      const totalAmount = total(records).toLocaleString()
      Category.find()
        .lean()
        .then(category => {
          category = category.map(item => {
            return { ...item, isSelected: item.category === query }
          })
          res.render('index', { records, totalAmount, category })
        })
    })
    .catch(error => console.log(error))
})

//匯出路由器
module.exports = router