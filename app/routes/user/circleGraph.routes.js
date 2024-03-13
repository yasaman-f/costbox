const { circlrGraphController } = require("../../controller/user/circleGraphController")

const router = require("express").Router()

router.post("/pieChart", circlrGraphController.pieChart)

module.exports = {
    AnalyzeRoutes: router
}