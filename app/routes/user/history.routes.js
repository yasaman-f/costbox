const { HistoryController } = require("../../controller/user/HistoryController")

const router = require("express").Router()

router.post("/search", HistoryController.checkHistory)

module.exports = {
    HistoryRoutes: router
}