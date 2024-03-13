const joi = require("@hapi/joi")

const PieChart = joi.object({
    fromDate: joi.string().allow("").regex(/(13\d\d|14\d\d)[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12]\d|3[01])/).error(new Error("The fromDate is incorrect")) ,
    toDate: joi.string().allow("").regex(/(13\d\d|14\d\d)[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12]\d|3[01])/).error(new Error("The toDate is incorrect")),
    range: joi.string().regex(/(Today|This week|This month|This year|All time|Custom range)/i).error(new Error("The range is incorrect"))
})


module.exports = {
    PieChart
}