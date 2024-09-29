const twilio = require('twilio');

// Thay thế các giá trị này bằng thông tin từ tài khoản Twilio của bạn
const accountSid = 'ACccd58716d3c4028c95a6280f1299173f';
const authToken = '5b004ac0d596203d8fd77572775e78a8';
const client = new twilio(accountSid, authToken);

const sendSms = (to, body) => {
    client.messages.create({
        body: body,
        to: to,  // Số điện thoại người nhận
        from: '+15312081686' // Số Twilio của bạn
    })
        .then(message => console.log(message.sid))
        .catch(error => console.error(error));
};

// Gọi hàm sendSms với số điện thoại người nhận và nội dung tin nhắn
sendSms('+84378404595', 'Xin chào từ Twilio!');