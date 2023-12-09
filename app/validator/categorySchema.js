const joi = require("@hapi/joi")

const category = joi.object({
    title: joi.string().min(3).error(new Error("The title should more than 3 char")) ,
    minimumConsumption : joi.string().error(new Error("The min is incorrect")),
    maximumConsumption : joi.string().error(new Error("The max is incorrect"))
})

module.exports = {
    category 
}