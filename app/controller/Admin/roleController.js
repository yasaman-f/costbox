const Error = require("http-errors")
const { StatusCodes: HttpStatus } = require("http-status-codes")
const mongoose = require("mongoose")
const { RoleModel } = require("../../model/role")
const { RoleSchema, giveRole } = require("../../validator/RBACSchema")
const Controller = require("../MainController")
const { removeExtraData } = require("../../utils/functions")
const { PermissionModel } = require("../../model/permission")
const { UserModel } = require("../../model/user")




class RoleController extends Controller{
    async getAllRole(req, res, next){
        try{
          const role = await RoleModel.find({})
          return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
                role
            }
        })
        }catch (error){
            next(error)
        }
    }
    async createNewRole(req, res, next){
        try{
            const{title, permissions, description } = await RoleSchema.validateAsync(req.body)
            await this.findRoleByTitle(title)
            const permission = await PermissionModel.find({_id: permissions})
            if(!permission[0]) throw Error.NotFound("permission not exist")
            const role = await RoleModel.create({title, permissions, description })
            if(!role) throw Error.InternalServerError("create role Failed")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "create role successfully"
                }
            })
        }catch (error){
            next(error)
        }
    }
    async removeRole(req, res, next){
        try {
            const {field} = req.params;
            const role = await this.findRoleByID(field)
            const remove = await RoleModel.deleteOne({_id: role._id})
            if(!remove.deletedCount) throw Error.InternalServerError("delete role failed")
            return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
                message : "delete role successfully"
            }})
        } catch (error) {
            next(error)
        }
    }
    async updateRole(req, res, next){
        try {
            const {id} = req.params;
            await this.findRoleByID(id)
            const data =  JSON.parse(JSON.stringify(req.body))
            removeExtraData(data)
            if(data.permissions) {
                const permission = await PermissionModel.find({_id: data.permissions})
                if(!permission[0]) throw Error.NotFound("permission not exist")
            }
            const update =  await RoleModel.updateOne({_id: id}, {$set: data})
            if(!update.modifiedCount) throw Error.InternalServerError("update role failed")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message : "update role successfully"
                }})
        } catch (error) {
            next(error)
        }
    }
    async giveRoleToUser(req, res, next){
        try {
            await giveRole.validateAsync(req.body)
            const {roleID, userID} = req.body;

            const findUser = await UserModel.find({_id: userID})
            if(!findUser[0]) {throw Error.NotFound("this user has not exist")}

            const findRole = await RoleModel.find({_id: roleID})
            if(!findRole[0]) {throw Error.NotFound("this role has not exist")}

            const updateUser = await UserModel.updateOne({_id: userID}, {$set: {role: findRole[0].title}}) 
            if(!updateUser.modifiedCount) throw Error.InternalServerError("give role failed")

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message : "give role successfully"
                }})
        } catch (error) {
            next(error)
        }
    }
    async findRoleByTitle(title){
        const role = await RoleModel.findOne({title})
        if (role) throw Error.BadRequest("role already has exist")
    }
    async findRoleByID(field){
        const role = await RoleModel.findOne({_id: field})
        if (!role) throw Error.NotFound("role not found")
        return role
    }
}

module.exports = {
    RoleController: new RoleController()
}