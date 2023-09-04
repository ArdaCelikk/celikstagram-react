const express = require("express")
const router =  express.Router()
const userController = require("../controllers/userController")
const authMiddleware = require("../middlewares/authmiddleware")


router.route("/follow/:id").post(authMiddleware.authenticateToken,authMiddleware.checkUser,userController.followUser)


module.exports = router