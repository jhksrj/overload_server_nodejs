var express = require('express');
var router = express.Router();
require('dotenv').config();


router.post('/', function (req, res) {
  const RestClient = require('@bootpay/server-rest-client').RestClient;


  // 받은 자료는 privatekey및 부트페이 IP( 223.130.82.0/24 (NETMASK 255.255.255.0) 네트워크 대역) 를 대조하여 부트페이에서 보내준 자료라고 확인을 할 수가 있다. 

  let receipt_id = req.body.receipt_id
  let price = req.body.price

  console.log('여기 restclient 시작')
  console.log('receipt_id : ' + receipt_id);
  console.log('price : ' + price);

  RestClient.setConfig(
    process.env.BootPay_ApplicationID,
    process.env.BootPay_PrivateKey
  );

  RestClient.getAccessToken().then(function (response) {
    console.log('accesstoken 발급 받았을 때? ')
    // Access Token을 발급 받았을 때
    if (response.status === 200 && response.data.token !== undefined) {
      RestClient.verify(receipt_id).then(function (_response) {
        console.log('검증결과를 제대로 가져왔을 때? ')
        // 검증 결과를 제대로 가져왔을 때
        if (_response.status === 200) {
          // 원래 주문했던 금액이 일치하는가?
          // 그리고 결제 상태가 완료 상태인가?

          console.log("_response.data.price: " + _response.data.price)
          if (_response.data.price === price && _response.data.status === 1) {
            // TODO: 이곳이 상품 지급 혹은 결제 완료 처리를 하는 로직으로 사용하면 됩니다.
            // 일단 여기서는 아무 것도 안하면 되고 
            console.log("결제 완료 처리하는 로직 ")
          }
          else {
            // 만약 틀렸다면 
            console.log("취소하는 로직을 여기서 구현하면 되겠다.  ")
            // 취소하는 로직
          }
        }
      });
    }
  });


  res.json({ success: "Payments Evaluated" });
});


module.exports = router;