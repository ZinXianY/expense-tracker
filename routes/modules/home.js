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

//設定首頁路由
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(category => {
          const totalAmount = total(records).toLocaleString()
          res.render('index', { records, totalAmount, category })
        })
        .catch(error => console.log(error))
    })
})

//設計 new 頁面路由
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(category => {
      res.render('new', { category })
    })
    .catch(error => console.log(error))
})

//設定 Create 路由
router.post('/records', (req, res) => {
  const record = req.body
  const category = req.body.category
  Category.findOne({ category })
    .lean()
    .then(function (item) {
      return (record.icon = item.icon)
    })
    .then(() => {
      Record.create(record).then(() => res.redirect('/'))
    })
    .catch(error => console.log(error))
})

//匯出路由器
module.exports = router