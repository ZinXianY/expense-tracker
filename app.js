//載入工具
const express = require('express')
const app = express()

//設定首頁路由
app.get('/', (req, res) => {
  res.send('hello')
})


//設定監聽器
app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})