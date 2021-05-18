//載入工具
const express = require('express')
const exphbs = require('express-handlebars')
const record = require('./models/record')
const app = express()

//引用 Record model
const Record = require('./models/record')


//引用config/mongoose
require('./config/mongoose')

//套入樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定首頁路由
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.log(error))
})


//設定監聽器
app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})