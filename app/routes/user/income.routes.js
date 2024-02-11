const { IncomeController } = require("../../controller/user/IncomeController")

const router = require("express").Router()

router.post("/addBy", IncomeController.addIncome)
router.delete("/addBy", IncomeController.spendIncome)
router.put("/addBy", IncomeController.transferIncome)

module.exports = {
    IncomeRoutes: router
}