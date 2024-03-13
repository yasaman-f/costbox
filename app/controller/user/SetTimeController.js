const { signUp, verifyEmail, login, sendOtp, checkOtp } = require("../../validator/authenticationSchema")
const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")
const { AddSetTimeSchema } = require("../../validator/setTime")
const { DateConverter } = require("../../module/shamsi")
const { SetTimeModel } = require("../../model/setTime")
const { VOGC } = require("../../module/googleapis")

class SetTimeController extends Controller{ 
    async addEvent(req, res , next){
        try {
            await AddSetTimeSchema.validateAsync(req.body)
            const { type, when, description, startDate, endDate  } = req.body
            let newDate = DateConverter(when)
            if( newDate[1]<10 ) newDate[1] = "0" + newDate[1]
            if( newDate[2]<10 ) newDate[2] = "0" + newDate[2]
            newDate = (`${newDate[0]}-${newDate[1]}-${newDate[2]}`);
            let summary = []
            if(type == "Debtor") {
                summary = "Debtor"
            }else{ 
                summary = "Creditor"
            }

            const start = `${newDate}T${startDate}:00`
            const end = `${newDate}T${endDate}:00`

            const makeEvent = await VOGC(req.user._id, summary, description, start, end)

            const recordEvent = await SetTimeModel.create({type, userID: req.user._id, when: {startDate: start, endDate: end}, description})

            return res.status(HttpStatus.CREATED).json({
                data: {
                    message: "The given time is set in our database and your Google Calendar"
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async deleteEvent(req, res, next){
        try {
             
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    SetTimeController: new SetTimeController()
}
