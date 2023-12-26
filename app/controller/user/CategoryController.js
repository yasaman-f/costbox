const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")
const { createCategory } = require('../../validator/categorySchema')
const { CategoryModel } = require('../../model/category')
const { removeExtraData } = require('../../utils/functions')


class CategoryController extends Controller{
    async addCetgory(req, res, next){
        try {
            await createCategory.validateAsync(req.body)
            const {_id} = req.user
            const data = req.body
            data._id = _id
            removeExtraData(data)
            const findCategory = await CategoryModel.findOne({title: data.title})
            if(findCategory) throw Error.BadRequest("this category alreadt exist")
            const CreateCategory = await CategoryModel.create(data)
            return res.status(HttpStatus.CREATED).json({
                data: {
                    message: "The category creation was successful🎉"
                }
        }) 
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = {
    CategoryController: new CategoryController()
}
