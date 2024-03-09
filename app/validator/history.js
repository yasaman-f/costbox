const joi = require("@hapi/joi")

const checkHistory = joi.object({
    fromDate: joi.string().regex(/(13\d\d|14\d\d)[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12]\d|3[01])/).error(new Error("The fromDate is incorrect")) ,
    toDate: joi.string().regex(/(13\d\d|14\d\d)[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12]\d|3[01])/).error(new Error("The toDate is incorrect")),
    type: joi.string().regex(/(Total history|Income history|Spend history|Transfer history|Save history)/i).error(new Error("The type is incorrect"))
})


module.exports = {
    checkHistory
}