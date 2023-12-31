const { CategoryController } = require("../../controller/user/CategoryController")

const router = require("express").Router()

router.post("/add", CategoryController.addCetgory)
router.get("/get", CategoryController.getCategory)
router.put("/update/:CategoryID", CategoryController.editCategory)
router.delete("/remove/:CategoryID", CategoryController.removeCategory)

module.exports = {
    CategoriesRoutes: router
}