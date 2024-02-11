const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")



class IncomeController extends Controller{
    async addIncome(req, res, next){
        
    }
    async spendIncome(req, res, next){

    }
    async transferIncome(req, res, next){

    }
}

module.exports = {
    IncomeController: new IncomeController()
}
