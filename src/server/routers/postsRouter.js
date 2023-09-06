const express = require("express")
const router =  express.Router()
const postsController = require("../controllers/postsController")
const authMiddleware = require("../middlewares/authmiddleware")


router.route("/").post(authMiddleware.authenticateToken,authMiddleware.checkUser,postsController.sendPosts)
router.route("/create").post(authMiddleware.authenticateToken,authMiddleware.checkUser,postsController.createPost)


module.exports = router