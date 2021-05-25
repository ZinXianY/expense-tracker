//載入工具
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

//引用路由器
const routes = require('./routes')

//引用config/mongoose
require('./config/mongoose')

const app = express()

//套入樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定 body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//導入路由器
app.use(routes)

//設定監聽器
app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})