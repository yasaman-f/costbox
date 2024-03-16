const {PermissionController} = require("../../controller/Admin/permissionController")

const router = require("express").Router()


router.get("/list", PermissionController.getAllPermission)
router.post("/add", PermissionController.createNewPermission)
router.delete("/remove/:id", PermissionController.removePermission)
router.patch("/update/:id", PermissionController.updatePermission)



module.exports = {
    PermissionRoutes: router
}