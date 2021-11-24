# 老爸的私房錢
使用Express結合MongoDB 打造出來的一個簡單支出記帳本。

![image](/public/expense-tracker-v2.PNG)

## 產品功能
* 使用者必須登入才可以使用。
* 使用者可以註冊或使用第三方 FB 註冊。
* 使用者可以瀏覽首頁中的所有支出資料。
* 使用者可以新增一筆支出資料。
* 使用者可以修改任一項支出資料。
* 使用者可以刪除一筆支出資料。
* 使用者可以利用篩選功能篩選自己想要的支出類別。
* 使用者可以點選左上角的Expense Tracker 回到首頁。

## 環境建置
* Node.js: v10.15.0
* Express: ^4.17.1
* Express-handlebars: ^5.3.2
* express-session: ^1.17.2
* body-parser: ^1.19.0
* method-override: ^3.0.0
* mongoDB: v4.2.13
* mongoose: ^5.12.8
* bcryptjs: ^2.4.3
* passport: ^0.5.0
* passport-facebook: ^3.0.0
* passport-local: ^1.0.0

## 專案安裝
1. 下載專案
```
git clone https://github.com/ZinXianY/expense-tracker.git
```

2. 切換存放此專案的資料夾
```
cd expense-tracker
```

3. 安裝npm套件
```
npm install
```

4. 新增種子資料
```
npm run seed
```

5. 啟動伺服器執行檔案
```
npm run dev
```

6. 出現以下字樣表式啟動成功!
```
APP is running on http://localhost:3000
```