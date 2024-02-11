const joi = require("@hapi/joi")

const addIncomeSchema = joi.object({
    withWhat: joi.string().regex(/(cart|cash)/i).error(new Error("the type is incorrect")),
    howMuch: joi.string().min(5).error(new Error("Income should not be less than 10,000 Rials")),
    description:  joi.string().min(3).max(50).error(new Error("the description is incorrect"))
});

const spendSchema = joi.object({
    howMuch: joi.string().min(5).error(new Error("What did you buy for less than 10,000 Rials? :)")),
    categoryID: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("the categoryID is incorrect"))
})

const transferSchema = joi.object({
    type: joi.string().regex(/(Cash to bank | Bank to cash | Cash to Save | Bank to save)/i).error(new Error("the type is incorrect")),
    howMuch: joi.string().min(5).error(new Error("Income should not be less than 10,000 Rials")),

})

module.exports = {
    addIncomeSchema,
    spendSchema,
    transferSchema
}