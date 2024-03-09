const joi = require("@hapi/joi")

const AddSetTimeSchema = joi.object({
    type: joi.string().regex(/(Debtor|Creditor)/i).error(new Error("The type is incorrect")),
    startDate : joi.string().regex(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/).error(new Error("The startDate is incorrect")),
    endDate  : joi.string().regex(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/).error(new Error("The endDate is incorrect")),
    when: joi.string().regex(/(13\d\d|14\d\d)[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12]\d|3[01])/).error(new Error("The date or time is incorrect")),
    description: joi.string().min(5).error(new Error("The description is incorrect")),
})


module.exports = {
    AddSetTimeSchema
}