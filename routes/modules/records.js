//引用Express 及 Express路由器
const express = require('express')
const router = express.Router()

//引用 Record & Category model
const Record = require('../../models/record')
const Category = require('../../models/category')

//設定 edit 頁面路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})
//設定 edit 餐廳資料
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount

      Category.findOne({ category })
        .lean()
        .then((item) => {
          record.icon = item.icon
        })
        .then(() => {
          record.save()
        })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//設定 delete路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//匯出路由器
module.exports = router