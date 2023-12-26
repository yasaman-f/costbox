const { CategoryController } = require("../../controller/user/CategoryController")

const router = require("express").Router()

router.post("/add", CategoryController.addCetgory)

module.exports = {
    CategoriesRoutes: router
}