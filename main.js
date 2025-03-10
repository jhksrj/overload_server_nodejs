

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config()


const user = require('./routes/user');
const evalbootpay = require('./routes/evalBootpay');   // 부트 페이 결제 검증 

//CORS 이슈 
app.use(cors());

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/user', user);
app.use('/evalbootpay', evalbootpay);  //부트페이 결제 검증 

app.get('/', function (req, res) {
  res.send("오버로드 서버입니다.")
})


app.listen(process.env.PORT || 3000, function () {
  console.log(' 오버로드 서버 실행 중')
});