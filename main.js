require('dotenv').config()


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');


const user = require('./routes/user');
const evalbootpay = require('./routes/evalBootpay');   // 부트 페이 결제 검증 

//CORS 이슈 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/user', user);
app.use('/evalbootpay', evalbootpay);  //부트페이 결제 검증 

app.get('/', function (req, res) {
  res.send("hello woooorld")
})



app.listen(process.env.PORT || 3000, function () {
  console.log(' 오버로드 서버 실행 중')
});