const { checkToken } = require("../middleware/checkToken")
const { IncomeRoutes } = require("./user/income.routes")
const { HomeRoutes } = require("./main/main")
const { UserRoutes } = require("./user/authentication.routes")
const { CategoriesRoutes } = require("./user/categories.routes")
const { UsersRoutes } = require("./user/user.routes")
const { HistoryRoutes } = require("./user/history.routes")

const router = require("express").Router()

router.use("/", HomeRoutes)
router.use("/user", UserRoutes)
router.use("/category", checkToken, CategoriesRoutes)
router.use("/users", checkToken, UsersRoutes)
router.use("/income", checkToken, IncomeRoutes)
router.use("/history", checkToken, HistoryRoutes)

module.exports = {
    AllRoutes: router
}