const { UserController } = require("../../controller/user/userController")
const { uploadFile } = require("../../utils/multer")

const router = require("express").Router()

router.post("/add",  uploadFile.single("profile"),UserController.createUser)


module.exports = {
    UsersRoutes: router
}