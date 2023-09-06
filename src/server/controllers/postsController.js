const Posts = require("../models").posts
const User = require("../models").users

const createPost = async (req,res)=>{
    try {
        const {description, file, onlyText} = req.body
        if(onlyText) {
            const createPost = await Posts.create({
                user_id: res.locals.user.id,
                description: description,
                onlyText: true,
                url: undefined
            })
            if(createPost) {
                res.status(200).json({
                    succeded: true,
                    msg: "Post shared."
                })
            } else {
                res.status(201).json({
                    succeded: false,
                    msg: "Post couldn't shared."
                })
            }
        } else {
            // If photo exist
        }
    } catch (error) {
        res.status(500).json({
            succeded:false,
            msg: error.message
        })
    }
}

const sendPosts = async (req,res)=>{
    try {
        const getPosts = await Posts.findAll({
            include: [{
              model: User,
              attributes: ["username", "name", "profile_photo"]
            }],
            order: Posts.sequelize.literal('RAND()')
          })
        if(getPosts) {
            res.status(200).json({
                succeded: true,
                msg: "posts sended",
                posts: getPosts
            })
        } else {
            res.status(404).json({
                succeded: false,
                msg: "Posts not exist."
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded:false,
            msg: error.message
        })
    }
}

module.exports = {
    createPost,
    sendPosts
}