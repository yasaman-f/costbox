const { signUp, verifyEmail, login, sendOtp, checkOtp } = require("../../validator/authenticationSchema")
const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")
const { hashPassword, RandomNumber, sendCode, verifyPassword, AccessToken, otpExpire } = require("../../utils/functions")
const { UserModel } = require("../../model/user")
const { sendTwilioMessage } = require("../../module/twilio")


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
        const code = RandomNumber() 
        data.otp =  { code, expire: (new Date().getTime() + 120000)}
        
        sendCode(data.email, data.otp.code )
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
        if(findUser.otp.code == code){
            const access = await AccessToken(findUser._id)
            Access = access
        }else{
            throw Error.BadGateway("The code entered does not match the code sent")
        }
        if (+findUser.otp.expire < (Date.now())) throw Error.Unauthorized('code is expire please try again')
      
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
async ForgetPass(req, res, next){
    try {
        await sendOtp.validateAsync(req.body)
        const { phoneNumber } = req.body
        const user = await UserModel.findOne({phoneNumber})
        if(user){
            sendTwilioMessage(phoneNumber)
            res.cookie('phone-Number', phoneNumber, {maxAge: 86400000})
            
        }else{
            throw Error.NotFound("No users were found with the entered phone number")
        }
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
              message: "The code has been successfully sent to you. Please enter the received code.",
            }
          })

    } catch (error) {
        next(error)
    }
}
async checkotp (req, res, next){
    try {
        await checkOtp.validateAsync(req.body)
        const { code, newPassword  } = req.body
        const phoneNumber = req.cookies['phone-Number']
        const findUser = await UserModel.findOne({phoneNumber})
        let Access = ""
        if (+findUser.otp.expire < (Date.now())) throw Error.Unauthorized('code is expire please try again')
        if(findUser.otp == code){
            const access = await AccessToken(findUser._id)
            Access = access
        }else{
            throw Error.BadGateway("The code entered does not match the code sent")
        }
        res.cookie('Access-Token', Access, {maxAge: 43200000 })
        if (+findUser.otp.expire < (Date.now())) throw Error.Unauthorized('code is expire please try again')

        const password = hashPassword(newPassword)
        const updateUser = await UserModel.updateOne({phoneNumber: phoneNumber}, {$set: {password: password}})
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
              message: 'login was successful',
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
