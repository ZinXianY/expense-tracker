//引用 Express及 Express路由器
const express = require('express')
const passport = require('passport')
const router = express.Router()

//引用 User model
const User = require('../../models/user')

//設定登入路由
router.get('/login', (req, res) => {
  res.render('login')
})

//驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//設定註冊路由
router.get('/register', (req, res) => {
  res.render('register')
})

//設定登出路由
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

//設定註冊功能
router.post('/register', (req, res) => {
  //取得註冊表單參數
  const { name, email, password, confrimPassword } = req.body
  //檢查是否註冊過
  User.findOne({ email }).then(user => {
    //如註冊過退回原本畫面
    if (user) {
      console.log('此信箱已被註冊!')
      res.render('register', {
        name,
        email,
        password,
        confrimPassword
      })
    } else {
      //沒註冊過寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})
//匯出路由
module.exports = router