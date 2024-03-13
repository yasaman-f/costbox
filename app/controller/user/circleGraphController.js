const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors");
const { IncomeModel } = require('../../model/income');
const { PieChart } = require('../../validator/circleGraphSchema');
const { percentage, nameOfCategory, finalPercentage } = require('../../middleware/percentage');





class circlrGraphController extends Controller{
    async pieChart(req, res, next){
        try {
            await PieChart.validateAsync(req.body)
            const {range, fromDate, toDate} = req.body
            let result = ""

            if (range == "Today") {
                if (fromDate != "" || toDate != "") throw new Error.BadRequest("When you choose today, you can't click on the desired range. To select the desired date, you must to click on the custom range.")
                result = await this.Today(req.user._id)
            }else if(range == "This month"){
                if (fromDate != "" || toDate != "") throw new Error.BadRequest("When you choose This month, you can't click on the desired range. To select the desired date, you must to click on the custom range.")
                result = await this.ThisMonth(req.user._id)
            }else if(range == "This week"){
                if (fromDate != "" || toDate != "") throw new Error.BadRequest("When you choose This week, you can't click on the desired range. To select the desired date, you must to click on the custom range.")
                result = await this.ThisWeek(req.user._id)
            }else if(range == "This year"){
                if (fromDate != "" || toDate != "") throw new Error.BadRequest("When you choose This week, you can't click on the desired range. To select the desired date, you must to click on the custom range.")
                result = await this.ThisYear(req.user._id)
            }
            return res.status(HttpStatus.OK).json({
                data: {
                    message: result
                }
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    
    async Today (id){
        const today = new Date();

        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate(); 

        const fromDate = [year, month, day];
        const ToDate = [year, month, day + 1];


        const List = await IncomeModel.find({userID:id , createdAt: { $gte: fromDate, $lte: ToDate }})
        let response = []
        List.forEach(key => {
            if(key.howMuch[0] == "-"){
                response.push(key)
            }  })
        const listOfPercent = percentage(response)
        const resUL = await nameOfCategory(listOfPercent)
        const resULT = finalPercentage(resUL)
        return resULT
    }

    async ThisWeek (id){
        const today = new Date();

        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate() - today.getDay(); 

        const fromDate = [year, month, day];
        const ToDate = [year, month, day + 6];

        console.log(fromDate);
        console.log(ToDate);


        const List = await IncomeModel.find({userID:id , createdAt: { $gte: fromDate, $lte: ToDate }})
        let response = []
        List.forEach(key => {
            if(key.howMuch[0] == "-"){
                response.push(key)
            }  })
        const listOfPercent = percentage(response)
        const resUL = await nameOfCategory(listOfPercent)
        const resULT = finalPercentage(resUL)
        return resULT
    }

    async ThisMonth (id){
        const today = new Date();

        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = ""

        if(month > 6){
            day = 30
        }else if(month == 12){
            day = 29
        }else{
            day = 31
        }

        const fromDate = [year, month, 1];
        const ToDate = [year, month, day];
        

        const List = await IncomeModel.find({userID:id , createdAt: { $gte: fromDate, $lte: ToDate }})
        let response = []
        List.forEach(key => {
            if(key.howMuch[0] == "-"){
                response.push(key)
            }  })
        const listOfPercent = percentage(response)
        const resUL = await nameOfCategory(listOfPercent)
        const resULT = finalPercentage(resUL)
        return resULT
    }

    async ThisYear (id){
        const today = new Date();

        let year = today.getFullYear();

        const fromDate = [year, 1, 1];
        const ToDate = [year, 12, 29];
        

        const List = await IncomeModel.find({userID:id , createdAt: { $gte: fromDate, $lte: ToDate }})
        let response = []
        List.forEach(key => {
            if(key.howMuch[0] == "-"){
                response.push(key)
            }  })
        const listOfPercent = percentage(response)
        const resUL = await nameOfCategory(listOfPercent)
        const resULT = finalPercentage(resUL)
        return resULT
    }
}

module.exports = {
    circlrGraphController: new circlrGraphController()
}
