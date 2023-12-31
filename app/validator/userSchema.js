const joi = require("@hapi/joi")

const informationSchema = joi.object({
    firstName: joi.string().min(3).max(15).error(new Error("the first name is incorrect")),
    lastName: joi.string().min(3).max(20).error(new Error("the last name is incorrect")),
    userName: joi.string().regex(/^[a-zA-Z]{1,2}[a-zA-Z\_\.]{3,20}$/).error(new Error("You must fill in the username field")),
    phoneNumber: joi.string().pattern(/^\+98\d{10}$/).error(new Error("your phone number is incorrect")),
    email: joi.string().lowercase().trim().required().email().error(new Error("email is incorrect")),
    filename: joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(Error.BadRequest("filename incorrect")),
    fileUploadPath : joi.allow(),
}, {
    timestamps: true
});

module.exports = {
    informationSchema
}