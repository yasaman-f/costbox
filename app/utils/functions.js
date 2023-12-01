const crypto = require("crypto")
const dotenv = require("dotenv")
const nodemailer = require("nodemailer")
const { UserModel } = require("../model/user")
const jwt = require("jsonwebtoken")
const Error = require("http-errors")


dotenv.config()

const myEmail = process.env.EMAIL
const secretKey = process.env.SECRET_KEY

function hashPassword(pass) {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, "sha512").toString('hex')
    const newHash = `$QJHiWe@jwOkd.${salt}.${hash}`
    return newHash 
}

function verifyPassword(pass, hashPassword) {
    const salt = hashPassword.split(".")?.[1]
    const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, "sha512").toString('hex')
    const newHash = `$QJHiWe@jwOkd.${salt}.${hash}`
    return (newHash === hashPassword) 
}

function sendCode(email, code) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: myEmail,
        pass: 'fzqvxdzsiuphkeur'
      }
    });
    
    var mailOptions = {
      from: myEmail,
      to: email,
      subject: 'verify Email',
      text: `welcome to my site\nthis code is one-time passcode for your login:${code}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });   
}

function RandomNumber() {
    return Math.floor((Math.random() * 90000) + 10000)
}

function AccessToken(Id) {
  return new Promise(async (resolve, reject) => {
      const user = await UserModel.findById(Id)
      const payload = {
        phoneNumber: user.phoneNumber
      };
      const options = {
          expiresIn: "12h"
      };
      jwt.sign(payload, secretKey, options, (err, token) => {
          if (err) reject(Error.InternalServerError("Internal Server Error😬"), console.log(err));
          resolve(token)
      })
  })
}

function otpExpire(otpCode){
  const otpExpirationTime = 60 * 1000; 
  
  function expireOTP() {
      otpCode = null; 
      return new Error[410]
  }

  const otpTimer = setTimeout(expireOTP, otpExpirationTime);
}



module.exports = {
    hashPassword,
    verifyPassword,
    sendCode,
    RandomNumber,
    AccessToken,
    otpExpire
}