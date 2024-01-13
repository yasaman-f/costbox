const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")
const path = require("path")
const { informationSchema } = require('../../validator/userSchema')
const { UserModel } = require('../../model/user')
const { AccessToken } = require('../../utils/functions')
const dotenv = require("dotenv")

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

            if( userValidate.fileUploadPath && userValidate.filename){
                req.body.image = path.join(userValidate.fileUploadPath, userValidate.filename)
                req.body.image = req.body.image?.replace(/\\/g, "/")
                req.body.image = `${urL}${port}/${req.body.image}`
            }

            const { firstName, lastName, userName, phoneNumber, email } = req.body
            const data = { firstName, lastName, userName, phoneNumber, email }
            data.profile = req.body.image

            const findNumber = await UserModel.findOne({phoneNumber})
            const finduserName = await UserModel.findOne({userName})
            
            if( (findNumber || finduserName) != null ){
                if(findNumber == null){
                    if(finduserName?._id.valueOf() !== findUser._id.valueOf()) throw Error.BadRequest("user already exist")
                }
                if(finduserName == null){
                    if(findNumber?._id.valueOf() != findUser._id.valueOf() ) throw Error.BadRequest("user already exist")
                }
            }
            const createUser = await UserModel.updateOne({_id : findUser["_id"]}, {$set: data})

            const access = await AccessToken(_id)
            res.cookie('Access-Token', access, {maxAge: 43200000 })

            return res.status(HttpStatus.CREATED).json({
                data: {
                    message: "The user information saved🎉"
                }
        }) 
        } catch (error) {
            next(error)
        }
    }
    async getUser(req, res, next){
        try {
              
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController: new UserController()
}
