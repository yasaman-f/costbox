const { HomeRoutes } = require("./main/main")
const { UserRoutes } = require("./user/authentication.routes")

const router = require("express").Router()

router.use("/", HomeRoutes)
router.use("/user", UserRoutes)

module.exports = {
    AllRoutes: router
}