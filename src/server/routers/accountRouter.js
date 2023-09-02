const express = require("express")
const router =  express.Router()
const accountController = require("../controllers/accountController")


router.route("/register").post(accountController.registerUser)
router.route("/login").post(accountController.loginUser)


module.exports = router