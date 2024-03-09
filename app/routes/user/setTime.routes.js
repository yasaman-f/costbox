const {SetTimeController} = require("../../controller/user/SetTimeController")

const router = require("express").Router()

router.post("/addSetTime", SetTimeController.addEvent)

module.exports = {
    SetTimeRoutes: router
}