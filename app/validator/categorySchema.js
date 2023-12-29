const joi = require("@hapi/joi")

const createCategory = joi.object({
    title: joi.string().min(3).error(new Error("The title should more than 3 char")) ,
    description : joi.string().min(5).error(new Error("The description should more than 5 char")),
    amountOfSpend : joi.string().error(new Error("The amountOfSpend is incorrect")),
    parent :   joi.string().allow('').regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("The parent is incorrect")),
    children :   joi.string().allow('').regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("The children is incorrect"))
})

const removeCategory = joi.object({
    categoryID: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("The category is incorrect"))
})

module.exports = {
    createCategory,
    removeCategory
}