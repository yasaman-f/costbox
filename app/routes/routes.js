const { checkToken } = require("../middleware/checkToken")
const { IncomeRoutes } = require("./user/income.routes")
const { HomeRoutes } = require("./main/main")
const { UserRoutes } = require("./user/authentication.routes")
const { CategoriesRoutes } = require("./user/categories.routes")
const { UsersRoutes } = require("./user/user.routes")
const { HistoryRoutes } = require("./user/history.routes")
const { SetTimeRoutes } = require("./user/setTime.routes")
const { AnalyzeRoutes } = require("./user/circleGraph.routes")
const { PermissionRoutes } = require("./Admin/permission")
const { RoleRoutes } = require("./Admin/role")

const router = require("express").Router()

router.use("/", HomeRoutes)
router.use("/user", UserRoutes)
router.use("/category", checkToken, CategoriesRoutes)
router.use("/users", checkToken, UsersRoutes)
router.use("/income", checkToken, IncomeRoutes)
router.use("/history", checkToken, HistoryRoutes)
router.use("/analyze", checkToken, AnalyzeRoutes)
router.use("/setTime", checkToken, SetTimeRoutes)
router.use("/admin/permissions", checkToken, PermissionRoutes)
router.use("/admin/roles", checkToken, RoleRoutes)

module.exports = {
    AllRoutes: router
}