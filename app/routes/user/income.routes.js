const { IncomeController } = require("../../controller/user/IncomeController")

const router = require("express").Router()

router.post("/addBy", IncomeController.addIncome)
router.delete("/spend", IncomeController.spendIncome)
router.put("/transfer", IncomeController.transferIncome)

module.exports = {
    IncomeRoutes: router
}