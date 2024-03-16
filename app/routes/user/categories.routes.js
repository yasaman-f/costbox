const { CategoryController } = require("../../controller/user/CategoryController")
const { addCategoryToEveryOne } = require("../../middleware/addCatgoryFromAdmin")

const router = require("express").Router()

router.post("/add", addCategoryToEveryOne, CategoryController.addCetgory)
router.get("/get", CategoryController.getCategory)
router.put("/update/:CategoryID", CategoryController.editCategory)
router.delete("/remove/:CategoryID", CategoryController.removeCategory)

module.exports = {
    CategoriesRoutes: router
}