const { CategoryController } = require("../../controller/user/CategoryController")

const router = require("express").Router()

router.post("/add", CategoryController.addCetgory)
router.get("/get", CategoryController.getCategory)

module.exports = {
    CategoriesRoutes: router
}