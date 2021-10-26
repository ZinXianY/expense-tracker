//引用Express 及 Express路由器
const express = require('express')
const router = express.Router()

//引入home 模組程式碼
const home = require('./modules/home')

//引入 records 模組程式碼
const records = require('./modules/records')

//引入 users 模組程式碼
const users = require('./modules/users')

//引入 filter 模組程式碼
const filter = require('../routes/modules/filter')

//符合 / 字串導向 home 模組
router.use('/', home)

//符合 /records 字串導向 records 模組
router.use('/records', records)

//符合 /users 字串導向 users 模組
router.use('/users', users)

//符合 /filter 字串導向 filter 模組
router.use('/filter', filter)

//匯出路由器
module.exports = router