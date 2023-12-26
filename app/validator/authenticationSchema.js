const joi = require("@hapi/joi")

const signUp = joi.object({
    userName: joi.string().regex(/^[a-zA-Z]{1,2}[a-zA-Z\_\.]{3,20}$/).error(new Error("You must fill in the username field")),
    email: joi.string().lowercase().trim().required().email().error(new Error("email is incorrect")),
    password: joi.string().min(8).max(16).trim().required().error(new Error("password should beetwen 8-16 char ")),
    repeatPassword: joi.string().min(8).max(16).trim().required().error(new Error("repeatPassword should beetwen 8-16 char ")),
})

const login = joi.object({
    email: joi.string().lowercase().trim().required().email().error(new Error("email is incorrect")),
    password: joi.string().min(8).max(16).trim().required().error(new Error("password should beetwen 8-16 char ")),
})

const sendOtp = joi.object({
    phoneNumber: joi.string().pattern(/^\+98\d{10}$/).error(new Error("your phone number is incorrect")),
})

const checkOtp = joi.object({
    code: joi.string().min(4).max(6).error(new Error("code is incorrect")),
    newPassword: joi.string().min(8).max(16).trim().required().error(new Error("password should beetwen 8-16 char ")),
})

const verifyEmail = joi.object({
    code: joi.string().min(4).max(6).error(new Error("code is incorrect"))
})

module.exports = {
    signUp,
    login,
    sendOtp,
    checkOtp,
    verifyEmail 
}