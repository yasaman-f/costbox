const crypto = require("crypto")
const dotenv = require("dotenv").config()
const { UserModel } = require("../model/user")
const jwt = require("jsonwebtoken")
const Error = require("http-errors")


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


function RandomNumber() {
    return Math.floor((Math.random() * 90000) + 10000)
}

function AccessToken(Id) {
  return new Promise(async (resolve, reject) => {
      const user = await UserModel.findById(Id)
      const payload = {
        email: user.email
      };
      const options = {
          expiresIn: "12h"
      };
      jwt.sign(payload, secretKey, options, (err, token) => {
          if (err) reject(Error.InternalServerError("Internal Server Error😬"));
          resolve(token)
      })
  })
}

function removeExtraData(data, fixedData = []) {
    let emptyData = [{}, [], "", " ", "0", 0, null, undefined]
    Object.keys(data).forEach(key => {
        if (fixedData.includes(key)) delete data[key]
        if (key == {}) delete data[key]
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
        if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if (emptyData.includes(data[key])) delete data[key];
    })
    return data
}



module.exports = {
    hashPassword,
    verifyPassword,
    RandomNumber,
    AccessToken,
    removeExtraData,
}