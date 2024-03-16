// const { CategoryModel } = require("../model/category")
// const { UserModel } = require("../model/user")
// const { createCategory } = require("../validator/categorySchema")

// async function addCategoryToEveryOne (req, res, next) {
//         try {
//             const {_id} =  req.user
//             const findUser = await UserModel.findOne({_id})
//             if(findUser.role == "ADMIN"){
//                 await createCategory.validateAsync(req.body)
//                 const data = req.body
//                 data.userID = _id
//                 removeExtraData(data)
//                 const findCategory = await CategoryModel.findOne({title: data.title})
//                 if( findCategory.userID.toString() == _id.toString()) throw Error.BadRequest("this category alreadt exist")
                
//                 const AllUser = await UserModel.findOne({})
//                 AllUser.forEach(async key => {
//                     data.userID = key._id
//                     const CreateCategory = await CategoryModel.create(data)

//                     const updateUser = await UserModel.findOne({_id: key._id})
//                     const UserCategory = updateUser.categories
//                     UserCategory.push(CreateCategory._id)
//                     const UpdateUser = await UserModel.updateOne({_id: key._id}, {$set: {categories: UserCategory}})
//                     if(!UpdateUser.modifiedCount) throw Error.InternalServerError("we cant create category.")

//                     if(data.parent){
//                         const findParent = await CategoryModel.find({_id: data.parent})
//                         if(findParent) {
//                             findParent.forEach(async key =>{
//                                 const addChild = await CategoryModel.updateOne({_id: key._id}, {$push: {children: CreateCategory._id}})
//                             })
//                         } else{
//                             throw Error.NotFound("The parent you entered does not exist. Please check again.")
//                         }
//                     }
//                 })

//             }
//         } catch (error) {
//             next(error)
//         }
//     }

    


// module.exports = {
//     addCategoryToEveryOne
// }

const { CategoryModel } = require("../model/category");
const { UserModel } = require("../model/user");
const { removeExtraData } = require("../utils/functions");
const { createCategory } = require("../validator/categorySchema");

async function addCategoryToEveryOne(req, res, next) {
    try {
        const { _id } = req.user;
        const findUser = await UserModel.findOne({ _id });

        if (findUser.role === "ADMIN") {
            await createCategory.validateAsync(req.body);
            const data = req.body;
            data.userID = _id;
            removeExtraData(data);

            const existingCategory = await CategoryModel.findOne({ title: data.title });
            if (existingCategory && existingCategory.userID.toString() === _id.toString()) {
                throw new Error("A category with this title already exists.");
            }

            const allUsers = await UserModel.find({});

            for (const user of allUsers) {
                data.userID = user._id;
                const createdCategory = await CategoryModel.create(data);

                user.categories.push(createdCategory._id);
                await user.save();

                if (data.parent) {
                    const parentCategory = await CategoryModel.findOne({ _id: data.parent });
                    if (parentCategory) {
                        parentCategory.children.push(createdCategory._id);
                        await parentCategory.save();
                    } else {
                        throw new Error("Parent category not found.");
                    }
                }
            }

            // ارسال پاسخ به درستی برای ادامه‌ی فرآیند
            return res.status(200).json({ message: "Categories added successfully to all users." });
        }

        // اگر کاربر ادمین نبود، به سطح بالاتر بروید
        next();
    } catch (error) {
        // مدیریت خطا و ارسال آن به middleware برای پاسخ مناسب
        next(error);
    }
}

module.exports = {
    addCategoryToEveryOne
};
