const joi = require("@hapi/joi")

const signUp = joi.object({
    firstName: joi.string().min(3).error(new Error("first name must be more than 3 char and you must fill this field")),
    lastName: joi.string().error(new Error("You must fill in the last name field")),
    userName: joi.string().regex(/^[a-zA-Z]{1,2}[a-zA-Z\_\.]{3,20}$/).error(new Error("You must fill in the username field")),
    phoneNumber: joi.string().pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4|5|6|7|8|9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/).error(new Error("your phone number is incorrect")),
    email: joi.string().lowercase().trim().required().email().error(new Error("email is incorrect")),
    password: joi.string().min(8).max(16).trim().required().error(new Error("password should beetwen 8-16 char ")),
})

const login = joi.object({
    phoneNumber: joi.string().pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4|5|6|7|8|9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/).error(new Error("your phone number is incorrect")),
    password: joi.string().min(8).max(16).trim().required().error(new Error("password should beetwen 8-16 char ")),
})

const sendOtp = joi.object({
    phoneNumber: joi.string().pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4|5|6|7|8|9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/).error(new Error("your phone number is incorrect")),
})

const checkOtp = joi.object({
    phoneNumber: joi.string().pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4|5|6|7|8|9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/).error(new Error("your phone number is incorrect")),  
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