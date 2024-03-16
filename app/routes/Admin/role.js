const router = require("express").Router()
const {RoleController} = require("../../controller/Admin/roleController")
const { stringToArray } = require("../../middleware/stringToArray")


router.get("/list", RoleController.getAllRole)
router.post("/giveRole", RoleController.giveRoleToUser)
router.post("/add",stringToArray("permissions"), RoleController.createNewRole)
router.delete("/remove/:field", RoleController.removeRole)
router.patch("/update/:id", stringToArray("permissions"), RoleController.updateRole)

module.exports = {
    RoleRoutes: router
}