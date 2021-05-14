//載入工具
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

//套入樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})


//設定監聽器
app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})