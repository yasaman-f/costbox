const { signUp, verifyEmail, login } = require("../../validator/authenticationSchema")
const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")
const { hashPassword, RandomNumber, sendCode, verifyPassword, AccessToken } = require("../../utils/functions")
const { UserModel } = require("../../model/user")


class UserAuthController extends Controller{
async signUp(req, res, next){
    try {
        await signUp.validateAsync(req.body)
        const data = req.body
        data.password = hashPassword(data.password)
        const findUsername = await UserModel.findOne({userName : data.userName})
        if(findUsername) throw new Error.BadRequest("This username already exists")
        const findUser = await UserModel.findOne({phoneNumber : data.phoneNumber})
        if(findUser) throw new Error.BadRequest("This user already exists")
        data.otp = RandomNumber()
        sendCode(data.email, data.otp )
        const createUser = await UserModel.create(data)
        res.cookie('User-Information', data.email, {maxAge: 86400000 })
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
              message: 'please verify email for complete sign up',
              
            }
          })
    } catch (error) {
        next(error)
    }
}
async verifyEmail(req, res , next){
    try {
        await verifyEmail.validateAsync(req.body)
        const { code } = req.body
        const email = req.cookies['User-Information']
        const findUser = await UserModel.findOne({email})
        let Access = ""
        if(findUser.otp == code){
            const access = await AccessToken(findUser._id)
            Access = access
        }else{
            throw Error.BadGateway("The code entered does not match the code sent")
        }
        res.cookie('Access-Token', Access, {maxAge: 43200000 })
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
              message: 'sign up was successful',
              Access,
            }
          })
    } catch (error) {
        next(error)
    }
}
async login(req, res, next){
    try {
        await login.validateAsync(req.body)
        const { phoneNumber, password  } = req.body
        const findUser = await UserModel.findOne({phoneNumber})
        if(!findUser) throw Error.NotFound("No users were found with the entered information")
        const checkPass = verifyPassword(password, findUser.password)
        let Access = ""
        if(checkPass == true){
            const access = await AccessToken(findUser._id)
            Access = access
        }else{
            throw Error.NotFound("No users were found with the entered information")
        }
        res.cookie('Access-Token', Access, {maxAge: 43200000 })
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
              message: 'Login was successful',
              Access,
            }
          })

    } catch (error) {
        next(error)
    }
}
}

module.exports = {
    UserAuthController: new UserAuthController()
}
