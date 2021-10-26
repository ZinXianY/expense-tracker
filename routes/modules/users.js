//引用 Express及 Express路由器
const express = require('express')
const router = express.Router()

//設定登入路由
router.get('/login', (req, res) => {
  res.render('login')
})

//設定註冊路由
router.get('/register', (req, res) => {
  res.render('register')
})
//匯出路由
module.exports = router