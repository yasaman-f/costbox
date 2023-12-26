const { createTransport } = require("nodemailer")

const host = "smtp.c1.liara.email"
const port = 587
const user = "nifty_blackwell_5iit1q"
const password = "1a5fd655-f506-40a9-bfd6-6ed5d98c1a43"
const sender = "verifyemail@c0stb0x.site"

function sendCode(email, code) {
    const transport = createTransport({
      host: host,
      port: port,
      tls: true,
      auth: {
        user: user,
        pass: password
      }
    });
    
    const emailOptions = {
      from: sender,
      to: email,
      subject: 'verify Email',
      text: `welcome to my site\nthis code is one-time passcode for your login:${code}`
    };
    
    transport.sendMail(emailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log(`email send: ${info.response}`);
      }
    });   
}

module.exports = {
  sendCode
}