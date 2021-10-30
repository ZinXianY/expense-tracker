//引用 Express及 Express路由器
const express = require('express')
const passport = require('passport')
const router = express.Router()

//引用 bcrypt
const bcrypt = require('bcryptjs')

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
  req.flash('success_msg', '已成功登出')
  res.redirect('/users/login')
})

//設定註冊功能
router.post('/register', (req, res) => {
  //取得註冊表單參數
  const { name, email, password, confrimPassword } = req.body

  //設定 Flash message
  const errors = []
  if (!name || !email || !password || !confrimPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confrimPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confrimPassword
    })
  }

  //檢查是否註冊過
  User.findOne({ email }).then(user => {
    //如註冊過退回原本畫面
    if (user) {
      errors.push({ message: '這個 Email 已被註冊過。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confrimPassword
      })
    }
    //沒註冊過寫入資料庫並將密碼加鹽
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})
//匯出路由
module.exports = router