const Posts = require("../models").posts
const User = require("../models").users
const Comments = require("../models").comments
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


const likePost = async (req,res)=>{
    try {
        const {postID} = req.body
        const post = await Posts.findOne({where:{id: postID}})
        let likes = await JSON.parse(post.likes)
        if(post) {
            if(likes.includes(res.locals.user.id)) {
                likes = await likes.filter(id => id !== res.locals.user.id);
                const updatePost = await Posts.update({likes: JSON.stringify(likes)}, {where:{id:postID}})
                if(updatePost) {
                    const posts = await Posts.findAll({
                        include: [{
                        model: User,
                        attributes: ["username", "name", "profile_photo"]
                        }],
                        order: Posts.sequelize.literal('RAND()')
                    })
                    if(posts) {
                        res.status(200).json({
                            succeded: true,
                            like: false,
                            posts: posts,
                            msg: "post unliked."
                        })
                    }
                } else {
                    res.status(403).json({
                        succeded: false,
                        msg: "update failed"
                    })
                }
            } else {
                likes.push(res.locals.user.id)
                const updatePost = await Posts.update({likes: JSON.stringify(likes)}, {where:{id: postID}})
                if(updatePost) {
                    const posts = await Posts.findAll({
                        include: [{
                        model: User,
                        attributes: ["username", "name", "profile_photo"]
                        }],
                        order: Posts.sequelize.literal('RAND()')
                    })
                    if(posts) {
                        res.status(200).json({
                            succeded:true,
                            like: true,
                            posts: posts,
                            msg: "post liked."
                        })
                    }
                } else {
                    res.status(403).json({
                        succeded: false,
                        msg: "update failed"
                    })
                }
            }
        } else {
            res.status(403).json({
                succeded: false,
                msg: "post not found."
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            msg: error.message
        })
    }
}


const getComments = async (req,res) =>{
    try {
        const comments = await Comments.findAll({
            include: [
              {
                model: Posts,
                attributes: ['id'], // Sadece post ID'sini çekme
              },
              {
                model: User,
                attributes: ['username', 'profile_photo'], // Kullanıcı adı ve profil fotoğrafı gibi özellikleri çekme
              },
            ],
        });
        if(comments) {
            res.status(200).json({
                succeded: true,
                comments: comments,
                msg: "Comments sended."
            })
        } else {
            res.status(403).json({
                succeded: false,
                msg: "Comments not found."
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            msg: error.message
        })
    }
}


const createComment =async (req,res)=>{
    try {
        const {comment, postId} = req.body
        const create = await Comments.create({
            content: comment,
            postId: postId,
            userId: res.locals.user.id
        })
        if(create) {
            const allComments = await Comments.findAll({
                include: [
                  {
                    model: Posts,
                    attributes: ['id'], // Sadece post ID'sini çekme
                  },
                  {
                    model: User,
                    attributes: ['username', 'profile_photo'], // Kullanıcı adı ve profil fotoğrafı gibi özellikleri çekme
                  },
                ],
            });
            if(allComments) {
                res.status(200).json({
                    succeded: true,
                    comments: allComments,
                    msg: "Comment shared."
                })
            } else {
                res.status(403).json({
                    succeded: false,
                    msg: "something missing."
                })
            }
        } else {
            res.status(403).json({
                succeded: false,
                msg: "Comment couldn't shared."
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            msg: error.message
        })
    }
}




const sendPostComment = async (req,res)=>{
    try {
        const postComments = await Comments.findAll({
            include: [
              {
                model: User,
                attributes: ['username', 'profile_photo'], // Kullanıcı adı ve profil fotoğrafı gibi özellikleri çekme
              },
            ],
            where: {
                postId: req.params.id
            }
        });
        if(postComments) {
            res.status(200).json({
                succeded: true,
                message: "Post comments sended.",
                postComments: postComments
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            msg: error.message
        })
    }
}


const sendOnePost = async (req,res)=>{
    try {
        const post = await Posts.findOne({
            include: [{
              model: User,
              attributes: ["username", "name", "profile_photo"]
            }],
            where:{id:req.params.id}
        })
        post.likes = JSON.parse(post.likes)
        if(post) {
            res.status(200).json({
                succeded: true,
                message: "post sended.",
                post: post
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            msg: error.message
        })
    }
}

module.exports = {
    createPost,
    sendPosts,
    likePost,
    getComments,
    createComment,
    sendPostComment,
    sendOnePost
}