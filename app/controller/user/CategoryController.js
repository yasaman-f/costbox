const { StatusCodes: HttpStatus } = require('http-status-codes')
const Controller = require("../MainController")
const Error = require("http-errors")
const { createCategory, editCategory, removeCategory } = require('../../validator/categorySchema')
const { CategoryModel } = require('../../model/category')
const { removeExtraData } = require('../../utils/functions')
const { UserModel } = require('../../model/user')


class CategoryController extends Controller{
    async addCetgory(req, res, next){
        try {
            await createCategory.validateAsync(req.body)
            const {_id} = req.user
            const data = req.body
            data.userID = _id
            removeExtraData(data)
            const findCategory = await CategoryModel.find({title: data.title})
            if(findCategory){
                findCategory.forEach(key => {
                    if(key.userID.toString() == _id.toString()) throw Error.BadRequest("this category alreadt exist")
                })
            }
            
            const CreateCategory = await CategoryModel.create(data)

            const updateUser = await UserModel.findOne({_id})
            const UserCategory = updateUser.categories
            UserCategory.push(CreateCategory._id)
            const UpdateUser = await UserModel.updateOne({_id}, {$set: {categories: UserCategory}})
            if(!UpdateUser.modifiedCount) throw Error.InternalServerError("we cant create category.")

        
            if(data.parent){
                console.log(CreateCategory._id);
                const findParent = await CategoryModel.findOne({_id: data.parent})
                if(findParent) {
                    const addChild = await CategoryModel.updateOne({_id: findParent._id}, {$push: {children: CreateCategory._id}})
                } else{
                    throw Error.NotFound("The parent you entered does not exist. Please check again.")
                }
            }
            return res.status(HttpStatus.CREATED).json({
                data: {
                    message: "The category creation was successful🎉"
                }
        }) 
        } catch (error) {
           next(error) 
        }
    }
    async getCategory(req, res, next) {
        try {
            const { search } = req.query
            const dataBase = {}
            if (search) dataBase['$text'] = { $search: search }  
            dataBase.userID = req.user._id 
            const categories = await CategoryModel.find(dataBase)
            const iterateCategories = async (categories) => {
                const result = []

                for (const category of categories) {
                    const subcategories = await CategoryModel.find({ parent: category._id }, {title: 1, description: 1 });
                    if (subcategories.length > 0) {
                        const subcategoryData = await iterateCategories(subcategories);
                        result.push({ category, subcategories: subcategoryData });
                    } else {
                        result.push({ category });
                    }
                }
                return result;
            };
    
            const result = await iterateCategories(categories);
    
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    categories: result
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async editCategory(req, res, next){
        try {
            await editCategory.validateAsync(req.body)
            const data = req.body
            removeExtraData(data)
            const { CategoryID } = req.params
            const category = await CategoryModel.findById(CategoryID)
            if(!category) throw Error.NotFound("this category not exist")
            const updateCategory = await CategoryModel.updateOne({_id: category._id}, {$set: data})
        
            if(data.parent){
                const changeParent = await CategoryModel.updateOne({_id: category.parent}, {$pull: {children: category._id}})
                const newParent = await CategoryModel.updateOne({_id: data.parent}, {$push: {children: category._id}})
            }
            if(!updateCategory.modifiedCount) throw Error.BadRequest("please select item and edit it")
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    message: "category's update was successfully"
                }
            });

        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res , next){
        try {
            await removeCategory.validateAsync(req.body)
            const { CategoryID } = req.params
            const category = await CategoryModel.findOne({_id: CategoryID})
            if(category.parent){
                const removeChildren = await CategoryModel.updateOne({_id: category.parent}, {$pull: {children: category._id}})
            }
            if(!category) throw Error.NotFound("the category not found")
            const deleteCategory = await CategoryModel.deleteOne({_id: CategoryID})
            if(!deleteCategory.deletedCount) throw Error.InternalServerError("The category could not be deleted") 
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    message: "category's delete was successfully"
                }
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CategoryController: new CategoryController()
}
