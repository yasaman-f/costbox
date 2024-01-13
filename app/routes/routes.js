const { checkToken } = require("../middleware/checkToken")
const { HomeRoutes } = require("./main/main")
const { UserRoutes } = require("./user/authentication.routes")
const { CategoriesRoutes } = require("./user/categories.routes")
const { UsersRoutes } = require("./user/user.routes")

const router = require("express").Router()

router.use("/", HomeRoutes)
router.use("/user", UserRoutes)
router.use("/category", checkToken, CategoriesRoutes)
router.use("/users", checkToken, UsersRoutes)

module.exports = {
    AllRoutes: router
}