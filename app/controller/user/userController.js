const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")
const path = require("path")
const { informationSchema, deleteUser } = require('../../validator/userSchema')
const { UserModel } = require('../../model/user')
const { AccessToken, deleteFileInPublic } = require('../../utils/functions')
const dotenv = require("dotenv")
const { default: mongoose } = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

dotenv.config()

const port = process.env.PORT
const urL = process.env.URL

class UserController extends Controller{
    async createUser(req, res, next) {
        try {
            const userValidate = await informationSchema.validateAsync(req.body)
            const {_id} = req.user 
            if(!_id) throw Error.BadRequest("please signUp/login")
            const findUser = await UserModel.findOne(_id)

        
            const { firstName, lastName, userName, phoneNumber, email } = req.body
            const data = { firstName, lastName, userName, phoneNumber, email }

            const findNumber = await UserModel.findOne({phoneNumber})
            const finduserName = await UserModel.findOne({userName}) 

            if(!(findUser.phoneNumber)){
                if( (findNumber || finduserName) != null ){
                    if((findNumber == null)){
                        if(finduserName?._id.toString() != findUser._id.toString()) throw Error.BadRequest("user already exist")
                    }
                    if((finduserName == null)){
                       if(findNumber?._id.toString() != findUser._id.toString() ) throw Error.BadRequest("user already Exist")
                 }
                }
            }else{
                console.log(findNumber?._id?.toString(), findUser._id.toString());
                console.log(finduserName?._id?.toString(), findUser._id.toString());
                if(findNumber?._id?.toString() != findUser._id.toString()) throw Error.BadRequest("user already Exist")
                if(finduserName?._id?.toString() != findUser._id.toString()) throw Error.BadRequest("user already Exist")
            }
           
            
            if( userValidate.fileUploadPath && userValidate.filename){
                req.body.image = path.join(userValidate.fileUploadPath, userValidate.filename)
                req.body.image = req.body.image?.replace(/\\/g, "/")
                req.body.image = `${urL}${port}/${req.body.image}`
            }
            data.profile = req.body.image

            
            const createUser = await UserModel.updateOne({_id : findUser._id}, {$set: data})

            const access = await AccessToken(_id)
            res.cookie('Access-Token', access, {maxAge: 43200000 })

            return res.status(HttpStatus.CREATED).json({
                data: {
                    message: "The user information saved🎉"
                }
        }) 
        } catch (error) {
            req.body.image = path.join(req.body.fileUploadPath, req.body.filename)
            deleteFileInPublic(req.body.image)
            console.log(req.body.image);
            next(error)
        }
    }
    async getUserHome(req, res, next){
        try {
            const {_id} = req.user
            const objectId = new ObjectId(_id)

            const user = await UserModel.aggregate([
                {
                  $match: {_id: objectId}
                },
                {
                    $lookup: {
                      from: "categories",
                      foreignField: "userID",
                      localField: "_id",
                      as: "categories"
                    }
                },
                {
                  $project: {
                      "categories.__v": 0,
                      "categories.updatedAt": 0,
                      "password": 0,
                      "otp": 0,
                      "__v": 0,
                      "updatedAt": 0,
                  }
              }
                ])
                if(!user) throw Error.NotFound("No user found")

            return res.status(HttpStatus.OK).json({
                data: {
                    user
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async findUser(req, res, next){
        try {
            const { search } = req.query
            const dataBase = {}
            if (search) dataBase['$text'] = { $search: search }  
            const user = await UserModel.find(dataBase, {_id : 0, password : 0, otp: 0})

            if(!user) throw Error.NotFound("user not found")
            return res.status(HttpStatus.OK).json({
                data: {
                    user
                }
            })
        } catch (error) {
            next(error)            
        }
    }
    async removeUser(req, res, next){
        try {
            await deleteUser.validateAsync(req.body)
            const { userID } = req.params

            const findUser = await UserModel.findOne({_id : userID})
            if(!findUser) throw Error.NotFound("user not found")

            const deleteUserr = await UserModel.deleteOne({_id : userID})

            return res.status(HttpStatus.OK).json({
                data: {
                    message: "user deleted"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteUser(req, res, next){
        try {
            await deleteUser.validateAsync(req.body)
            const { _id } = req.user

            const deleteUserr = await UserModel.deleteOne({_id : _id})

            return res.status(HttpStatus.OK).json({
                data: {
                    message: "your account deleted"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController: new UserController()
}
