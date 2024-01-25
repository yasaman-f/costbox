const { UserController } = require("../../controller/user/userController")
const { uploadFile } = require("../../utils/multer")

const router = require("express").Router()

router.post("/add",  uploadFile.single("profile"),UserController.createUser)
router.get("/get", UserController.findUser)
router.get("/userHome", UserController.getUserHome)
router.delete("/removeByAdmin/:userID", UserController.removeUser)
router.delete("/removeUser", UserController.deleteUser)


module.exports = {
    UsersRoutes: router
}