const router = require("express").Router()
const mainController = require("../../controller/main/firstPageController")

router.get("/", mainController.index)

module.exports = {
    HomeRoutes: router
}