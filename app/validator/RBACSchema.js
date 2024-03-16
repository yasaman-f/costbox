const joi = require("@hapi/joi")
const Error = require("http-errors")


const RoleSchema = joi.object({
    title: joi.string().min(2).max(30).error(Error.BadRequest("title incorrect")),
    permissions: joi.array().items(joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)).error(Error.BadRequest("permissions incorrect")),
    description: joi.string().min(0).max(100).error(Error.BadRequest("descripton incorrect"))

})

const giveRole = joi.object({
    userID: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("userID incorrect")),
    roleID: joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(Error.BadRequest("roleID incorrect")),
})

const PermissionSchema = joi.object({
    name: joi.string().min(3).max(30).error(Error.BadRequest("title incorrect")),
    description: joi.string().min(0).max(100).error(Error.BadRequest("descripton incorrect"))

})

module.exports = {
    RoleSchema,
    giveRole,
    PermissionSchema
}
    