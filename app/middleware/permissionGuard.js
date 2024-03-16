const Error = require("http-errors")
const { RoleModel } = require("../model/role")
const { PermissionModel } = require("../model/permission")



const PERMISSIONS = Object.freeze({
    USER : ["profile", "category", "income"],
    ADMIN : ["all"],
    SUPERADMIN : ["all"],
    CONTENT_MANAGER :[  "category"],
    ALL : "all"
})


function checkPermission(Permission = []) {
    return async function (req, res, next) {
        try {
            const user =  req.user
            const role = await RoleModel.findOne({title: user.roles})
            const permission = await PermissionModel.find({_id: {$in: role.permissions}})
            const userPer = permission.map(item => item.name)
            const per = Permission.every(permission => {
                return userPer.includes(permission)
            })
            if (userPer.includes(PERMISSIONS.ALL)) return next()
            if (Permission.length == 0 || per) return next()
            throw Error.Forbidden("you dont have permission for this part")
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = {
    checkPermission
}