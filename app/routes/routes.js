const { HomeRoutes } = require("./main/main")

const router = require("express").Router()

router.use("/", HomeRoutes)

module.exports = {
    AllRoutes: router
}