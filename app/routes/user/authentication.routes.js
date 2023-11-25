const { UserAuthController } = require("../../controller/user/AuthController")

const router = require("express").Router()

router.post("/Sign-Up", UserAuthController.signUp)
router.post("/verify-Email", UserAuthController.verifyEmail)
router.post("/Login", UserAuthController.login)

module.exports = {
    UserRoutes: router
}