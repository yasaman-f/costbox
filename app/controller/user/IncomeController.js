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
            let {howMuch , categoryID } = req.body

            const findCategory = await CategoryModel.findOne({_id: categoryID})

            if(!findCategory || ((findCategory.userID.toString()) != (req.user._id.toString()))) throw Error.BadRequest("This category does not exist")
            let newAmount = parseInt(howMuch) + parseInt(findCategory.amountOfSpend)
            newAmount = String(newAmount)
            const updateCategory = await CategoryModel.updateOne({_id: categoryID}, {$set: {amountOfSpend: newAmount}})

            const userFound = await UserModel.findOne({_id: req.user._id})
            let newIncome = parseInt(userFound.income) - parseInt(howMuch)
            newIncome = String(newIncome)
            const updateUser = await UserModel.updateOne({_id: req.user._id}, {$set: {income: newIncome}})

            howMuch = `-${howMuch}`
            const spendIncome = await IncomeModel.create({howMuch, categoryID})
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
            return res.status(HttpStatus.CREATED).json({
                data: {
                    message
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
