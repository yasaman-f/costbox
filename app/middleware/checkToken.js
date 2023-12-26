const jwt = require("jsonwebtoken")
const Error = require("http-errors")
const dotenv = require("dotenv")
const { UserModel } = require("../model/user")

dotenv.config()
const secretKey = process.env.SECRET_KEY

function getToken(params) {
    const [bearer, token] = params?.split(" ")|| []
    if(["Bearer", "bearer" && token].includes(bearer)) return token
    throw Error.Unauthorized("user not found. please Sign up/Login")
}

function checkToken(req, res , next) {
    try {
        const cooki = `Bearer ${req.cookies["Access-Token"]}`
        const token = getToken(cooki)
            jwt.verify(token, secretKey, async(err, payload)=> {
            try {
                if(err) throw Error.Unauthorized("please signUp/Login" + console.log(err))
                const {email} = payload || {}
                const user = await UserModel.findOne({email}, {password: 0, otp: 0})
                if (!user) throw Error.Unauthorized("User not found.😬")
                req.user = user
                return next()
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkToken
}