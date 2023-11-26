const { UserAuthController } = require("../../controller/user/AuthController")

const router = require("express").Router()

router.post("/Sign-Up", UserAuthController.signUp)
router.post("/verify-Email", UserAuthController.verifyEmail)
router.post("/Login", UserAuthController.login)
router.post("/forgetPass", UserAuthController.ForgetPass)
router.post("/checkOtp", UserAuthController.checkotp)

module.exports = {
    UserRoutes: router
}