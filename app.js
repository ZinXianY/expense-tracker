//載入工具
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()

//引用 Record model
const Record = require('./models/record')
const Category = require('./models/category')

//引用config/mongoose
require('./config/mongoose')

//套入樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定 body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//設定首頁路由
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.log(error))
})

//設計 new 頁面路由
app.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(category => res.render('new', { category }))
    .catch(error => console.log(error))
})

//設定 Create 路由
app.post('/records', (req, res) => {
  const record = req.body
  const category = req.body.category
  Category.findOne({ name: category })
    .lean()
    .then(function (item) {
      return (record.icon = item.icon)
    })
    .then(() => {
      Record.create(record).then(() => res.redirect('/'))
    })
    .catch(error => console.log(error))
})

//設定監聽器
app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})