const express = require("express")
const router =  express.Router()
const accountController = require("../controllers/accountController")
const authMiddleware = require("../middlewares/authmiddleware")



router.route("/register").post(accountController.registerUser)
router.route("/login").post(accountController.loginUser)
router.route("/profile").post(authMiddleware.checkUser,accountController.diffrentUserProfile)



module.exports = router