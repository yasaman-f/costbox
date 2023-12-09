const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")


class CategoryController extends Controller{

}

module.exports = {
    CategoryController: new CategoryController()
}
