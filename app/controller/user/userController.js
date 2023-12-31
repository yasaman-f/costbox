const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")



class UserController extends Controller{

}

module.exports = {
    UserController: new UserController()
}
