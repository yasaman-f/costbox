const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")
const { addIncomeSchema, spendSchema, transferSchema } = require('../../validator/incomeSchema')
const { UserModel } = require('../../model/user')
const { IncomeModel } = require('../../model/income')
const { CategoryModel } = require('../../model/category')
const { default: mongoose } = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


class IncomeController extends Controller{
    async addIncome(req, res, next){
        try {
            await addIncomeSchema.validateAsync(req.body)

            const {_id} = req.user
            const data = req.body
            data.userID = _id

            const userFound = await UserModel.findOne({_id})

            let howMuch = (parseInt(data.howMuch)) + (parseInt(userFound.income))
            howMuch = String(howMuch) 
            const updateUser = await UserModel.updateOne({_id}, {$set: {income: howMuch}})

            if( data.withWhat == "Bank"){
                let HowMuch = (parseInt(data.howMuch)) + (parseInt(userFound.bank))
                HowMuch = String(HowMuch) 
                const UpdateUser = await UserModel.updateOne({_id}, {$set: {bank: HowMuch}})
            }

            if( data.withWhat == "Cash"){
                let HowMuch = (parseInt(data.howMuch)) + (parseInt(userFound.cash))
                HowMuch = String(HowMuch) 
                const UpdateUser = await UserModel.updateOne({_id}, {$set: {cash: HowMuch}})
            }

            data.howMuch = `+${data.howMuch}`
            const addIncome = await IncomeModel.create(data)

            return res.status(HttpStatus.CREATED).json({
                data: {
                    message: "Your earnings have been added to your account history"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async spendIncome(req, res, next){
        try {
            await spendSchema.validateAsync(req.body)
            let {howMuch , categoryID, WithWhat } = req.body

            const findCategory = await CategoryModel.findOne({_id: categoryID})

            if(!findCategory || ((findCategory.userID.toString()) != (req.user._id.toString()))) throw Error.BadRequest("This category does not exist")
            let newAmount = parseInt(howMuch) + parseInt(findCategory.amountOfSpend)
            newAmount = String(newAmount)
            const updateCategory = await CategoryModel.updateOne({_id: categoryID}, {$set: {amountOfSpend: newAmount}})

            const userFound = await UserModel.findOne({_id: req.user._id})
            if( WithWhat == "Cash" || WithWhat == "Bank"){
                if((parseInt(howMuch) > parseInt(userFound.income))) throw Error.BadRequest("This amount is more than the money in your account")

                let newIncome = parseInt(userFound.income) - parseInt(howMuch)
                newIncome = String(newIncome)

                const updateUser = await UserModel.updateOne({_id: req.user._id}, {$set: {income: newIncome}})
            }

            if( WithWhat == "Cash" ){
                if((parseInt(howMuch) > parseInt(userFound.cash))) throw Error.BadRequest("This amount is more than the money in your account")

                let newCash = parseInt(userFound.cash) - parseInt(howMuch)
                newCash = String(newCash)

                const updateUser = await UserModel.updateOne({_id: req.user._id}, {$set: {cash: newCash}})
                req.body.description = "This cost has been removed from the cash"

            }

            if( WithWhat == "Bank" ){
                if((parseInt(howMuch) > parseInt(userFound.bank))) throw Error.BadRequest("This amount is more than the money in your account")

                let newBank = parseInt(userFound.bank) - parseInt(howMuch)
                newBank = String(newBank)

                const updateUser = await UserModel.updateOne({_id: req.user._id}, {$set: {bank: newBank}})
                req.body.description = "This cost has been removed from the bank account"

            }

            if(WithWhat == "Save") {
                if((parseInt(howMuch) > parseInt(userFound.saving))) throw Error.BadRequest("This amount is more than the money in your account")

                let newSaving = parseInt(userFound.saving) - parseInt(howMuch)
                newSaving = String(newSaving)

                const updateUser = await UserModel.updateOne({_id: req.user._id}, {$set: {saving: newSaving}})
                req.body.description = "This cost has been removed from the saving"


            }

            howMuch = `-${howMuch}`
            const spendIncome = await IncomeModel.create({howMuch, categoryID, description: req.body.description, userID: req.user._id})
            return res.status(HttpStatus.CREATED).json({
                data: {
                    message: "Your expenses have been added to your account history"
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async transferIncome(req, res, next){
        try {
            await transferSchema.validateAsync(req.body)
            let { type, howMuch } = req.body

            const userFound = await UserModel.findOne({_id: req.user._id})

            if(type == "Cash to bank" || type == "Bank to cash"){
                if(type == "Cash to bank"){
                    if((parseInt(howMuch) > parseInt(userFound.cash))) throw Error.BadRequest("This amount is more than the money in your account")
                    let newCash = parseInt(userFound.cash) - parseInt(howMuch)
                    let newBank = parseInt(userFound.bank) + parseInt(howMuch)
                    newCash = String(newCash)
                    newBank = String(newBank)
                    const updateUser = await UserModel.updateOne({_id: req.user._id}, {$set: {cash: newCash, bank: newBank}})
                    req.body.description = "transfer money from cash to bank accout"
                }else{
                    if((parseInt(howMuch) > parseInt(userFound.bank))) throw Error.BadRequest("This amount is more than the money in your account")
                    let newBank = parseInt(userFound.bank) - parseInt(howMuch)
                    let newCash = parseInt(userFound.cash) + parseInt(howMuch)
                    newCash = String(newCash)
                    newBank = String(newBank)
                    const updateUser = await UserModel.updateOne({_id: req.user._id}, {$set: {cash: newCash, bank: newBank}})
                    req.body.description = "transfer money from bank accout to cash"

                }

            }

            if( type == "Cash to Save" || type == "Bank to save"){
                if(type == "Cash to Save"){
                    if((parseInt(howMuch) > parseInt(userFound.cash))) throw Error.BadRequest("This amount is more than the money in your account")
                    let newCash = parseInt(userFound.cash) - parseInt(howMuch)
                    let newIncome = parseInt(userFound.income) - parseInt(howMuch)
                    let newSaving = parseInt(howMuch) + parseInt(userFound.saving) 
                    newCash = String(newCash)
                    newIncome = String(newIncome)
                    newSaving = String(newSaving)
                    const updateUser = await UserModel.updateOne({_id: req.user._id}, {$set: {cash: newCash, income: newIncome, saving: newSaving}})
                    req.body.description = "transfer money from cash to saving"
                }else{
                    if((parseInt(howMuch) > parseInt(userFound.bank))) throw Error.BadRequest("This amount is more than the money in your account")
                    let newBank = parseInt(userFound.bank) - parseInt(howMuch)
                    let newIncome = parseInt(userFound.income) - parseInt(howMuch)
                    let newSaving = parseInt(howMuch) + parseInt(userFound.saving) 
                    newBank = String(newBank)
                    newIncome = String(newIncome)
                    newSaving = String(newSaving)
                    const updateUser = await UserModel.updateOne({_id: req.user._id}, {$set: {bank: newBank, income: newIncome, saving: newSaving}})
                    req.body.description = "transfer money from bank account to saving"

                }
            }
            
            howMuch = `=>${howMuch}`
            const transfer = await IncomeModel.create({type, howMuch, description: req.body.description, userID: req.user._id})

            return res.status(HttpStatus.CREATED).json({
                data: {
                    message: "The desired amount of money was deposited to the desired account"
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    IncomeController: new IncomeController()
}
