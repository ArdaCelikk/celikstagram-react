const express = require("express")
const router =  express.Router()
const informationsController = require("../controllers/informationsController")
const authMiddleware = require("../middlewares/authmiddleware")


router.route("/userinformations").post(authMiddleware.checkUser,informationsController.getUserInformations)


module.exports = router