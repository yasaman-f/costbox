const { HomeRoutes } = require("./main/main")
const { UserRoutes } = require("./user/authentication.routes")
const { CategoriesRoutes } = require("./user/categories.routes")

const router = require("express").Router()

router.use("/", HomeRoutes)
router.use("/user", UserRoutes)
router.use("/category", CategoriesRoutes)

module.exports = {
    AllRoutes: router
}