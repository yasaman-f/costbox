const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")
const { checkHistory } = require('../../validator/history')
const sundate = require("sundate");
const { IncomeModel } = require('../../model/income')




class HistoryController extends Controller{
    async checkHistory(req, res, next){
        try {
            await checkHistory.validateAsync(req.body)
            const { fromDate, toDate, type } = req.body
            const {_id} = req.user

            let response = []

            if( type == "Total history") {
                response = await IncomeModel.find({userID: _id})

            }else if (type == "Income history") {
                const incomeFound = await IncomeModel.find({userID: _id})
                response = []
                incomeFound.forEach(key => {
                    if(key.howMuch[0] == "+"){
                        response.push(key)
                    }
                })

            }else if (type == "Spend history") {
                const incomeFound = await IncomeModel.find({userID: _id})
                response = []
                incomeFound.forEach(key => {
                    if(key.howMuch[0] == "-"){
                        response.push(key)
                    }
                })
            }else if (type == "Transfer history") {
                const incomeFound = await IncomeModel.find({userID: _id})
                response = []
                incomeFound.forEach(key => {
                    if(key.howMuch[0] == "="){
                        response.push(key)
                    }
                })
            }else if (type == "Save history") {
                const incomeFound = await IncomeModel.find({userID: _id})
                response = []
                incomeFound.forEach(key => {
                    const indeX = key.description.length - 1
                    if((key.description[indeX] == "g") && (key.howMuch[0] != "+")){
                        response.push(key)
                    }
                })
            return res.status(HttpStatus.OK).json({
                data: {
                    message: response
                }
            })
        }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    HistoryController: new HistoryController()
}
