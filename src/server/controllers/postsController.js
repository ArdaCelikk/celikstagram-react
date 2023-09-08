const Posts = require("../models").posts
const User = require("../models").users
const cloudinary = require('cloudinary').v2


const createPost = async (req,res)=>{
    try {
        const {description, file} = req.body
        let { onlyText } = req.body
        onlyText= await JSON.parse(onlyText)
        if(onlyText) {
            const createPost = await Posts.create({
                user_id: res.locals.user.id,
                description: description,
                onlyText: true,
                url: undefined
            })
            if(createPost) {
                res.status(201).json({
                    succeded: true,
                    msg: "Post shared."
                })
            } else {
                res.status(401).json({
                    succeded: false,
                    msg: "Post couldn't shared."
                })
            }
        } else {
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    use_filename: true,
                    folder: "celikstagram"
                }
            )
            if(result) {
                const createPost = await Posts.create({
                    user_id: res.locals.user.id,
                    description: description,
                    onlyText: false,
                    url: result.secure_url
                })
                if(createPost) {
                    res.status(201).json({
                        succeded: true,
                        msg: "post shared."
                    })
                } else {
                    res.status(401).json({
                        succeded: false,
                        msg: "Post couldn't shared."
                    })
                }
            } else {
                res.status(403).json({
                    succeded: false,
                    msg: "photo made a problem."
                })
            }
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