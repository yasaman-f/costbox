const twilio = require('twilio');
const { RandomNumber } = require('../utils/functions');
const { UserModel } = require('../model/user');

async function sendTwilioMessage(toPhoneNumber) {
    const accountSid = 'AC09d8a164d7fce3a3f0aad2e967fd4fd8';
    const authToken = '83d85ac77e51423e607693d215a9fcfb';
    const client = new twilio(accountSid, authToken);
    const verificationCode = RandomNumber()
    const updateUser = await UserModel.updateOne({phoneNumber: toPhoneNumber}, {$set: {otp: { code: verificationCode, expire: (new Date().getTime() + 120000)}}})
    return client.messages.create({
    body: `Your verification code is: ${verificationCode}`,
    from: "+15419823897",
    to: toPhoneNumber,
  });
}

// sendTwilioMessage("+989963897600")
//   .then(message => console.log(`Message sent with SID: ${message.sid}`))
//   .catch(error => console.error(`Error sending message: ${error.message}`));

module.exports = {
    sendTwilioMessage
}