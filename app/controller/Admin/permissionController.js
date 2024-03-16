const Error = require("http-errors")
const { StatusCodes: HttpStatus } = require("http-status-codes")
const Controller = require("../MainController")
const { PermissionModel } = require("../../model/permission")
const { PermissionSchema } = require("../../validator/RBACSchema")
const { removeExtraData } = require("../../utils/functions")


class PermissionController extends Controller{
    async getAllPermission(req, res, next){
        try{
          const permission = await PermissionModel.find({})
          return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
                permission
            }
        })
        }catch (error){
            next(error)
        }
    }
    async createNewPermission(req, res, next){
        try{
            const{name, description } = await PermissionSchema.validateAsync(req.body)
            await this.findPermissionByTitle(name)
            const permission = await PermissionModel.create({name, description})
            if(!permission) throw Error.InternalServerError("create permission Failed")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "create permission successfully"
                }
            })
        }catch (error){
            next(error)
        }
    }
    async removePermission(req, res, next){
        try {
            const {id} = req.params;
            await this.findPermissionByID(id)
            const remove = await PermissionModel.deleteOne({_id: id})
            if(!remove.deletedCount) throw Error.InternalServerError("delete permission failed")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message : "delete permission successfully"
                }})
        } catch (error) {
            next(error)
        }
    }
    async updatePermission(req, res, next){
        try {
            const {id} = req.params;
            await this.findPermissionByID(id)
            const data =  JSON.parse(JSON.stringify(req.body))
            removeExtraData(data)
            const update =  await PermissionModel.updateOne({_id: id}, {$set: data})
            if(!update.modifiedCount) throw Error.InternalServerError("update permission failed")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message : "update permission successfully"
                }})
        } catch (error) {
            next(error)
        }
    }
    async findPermissionByTitle(name){
        const permission = await PermissionModel.findOne({name})
        if (permission) throw Error.BadRequest("permission already has exist")
    }
    async findPermissionByID(_id){
        const permission = await PermissionModel.findOne({_id})
        if (!permission) throw Error.NotFound("permission not found")
        return permission
    }
}

module.exports = {
    PermissionController: new PermissionController()
}