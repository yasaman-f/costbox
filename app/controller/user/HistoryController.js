const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")
const { checkHistory } = require('../../validator/history')
const sundate = require("sundate");
const { IncomeModel } = require('../../model/income');
const { checkDate } = require('../../utils/functions');
const { DateConverter } = require('../../module/shamsi');




class HistoryController extends Controller{
    async checkHistory(req, res, next){
        try {
            await checkHistory.validateAsync(req.body)
            let { fromDate, toDate, type } = req.body
            fromDate = DateConverter(fromDate)
            toDate = DateConverter(toDate)
            const {_id} = req.user

            const findHistory = await IncomeModel.find({userID: _id, createdAt: { $gte: fromDate, $lte: toDate }});

            let response = []

            if( type == "Total history") {
                response = findHistory

            }else if (type == "Income history") {
                const incomeFound = findHistory
                response = []
                incomeFound.forEach(key => {
                    if(key.howMuch[0] == "+"){
                        response.push(key)
                    }
                })

            }else if (type == "Spend history") {
                const incomeFound = findHistory
                response = []
                incomeFound.forEach(key => {
                    if(key.howMuch[0] == "-"){
                        response.push(key)
                    }
                })
            }else if (type == "Transfer history") {
                const incomeFound = findHistory
                response = []
                incomeFound.forEach(key => {
                    if(key.howMuch[0] == "="){
                        response.push(key)
                    }
                })
            }else if (type == "Save history") {
                const incomeFound = findHistory
                response = []
                incomeFound.forEach(key => {
                    const indeX = key.description.length - 1
                    if((key.description[indeX] == "g") && (key.howMuch[0] != "+")){
                        response.push(key)
                    }
                })
            }
            return res.status(HttpStatus.OK).json({
                data: {
                    message: response
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    HistoryController: new HistoryController()
}
