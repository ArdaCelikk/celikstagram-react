const User = require("../models").users
const cloudinary = require('cloudinary').v2


const followUser = async (req,res)=>{
    try {
        const loggedUser = res.locals.user 
        const user = await User.findOne({where:{id: req.params.id}}) // who is follow / unfollow 
        if(user) {
            let  followers = JSON.parse(user.followers)
            let {following} = loggedUser // user

            if(followers.includes(loggedUser.id)) {
                followers = followers.filter(id => id !== loggedUser.id);
                const updateUser = await User.update({followers: JSON.stringify(followers)}, {where:{id:user.id}})

                following = following.filter(id => id !== user.id);
                const updateLoggedUser = await User.update({following: JSON.stringify(following)}, {where:{id:loggedUser.id}})


                if(updateLoggedUser && updateUser) {
                        res.status(200).json({
                            succeded:true,
                            msg: "Unfollowed"
                        })
                }


            } else {
                followers.push(loggedUser.id)
                const updateUser = await User.update({followers: JSON.stringify(followers)}, {where:{id:user.id}})

                following.push(user.id)
                const updateLoggedUser = await User.update({following: JSON.stringify(following)}, {where:{id:loggedUser.id}})

                if(updateLoggedUser && updateUser) {
                    res.status(200).json({
                        succeded: true,
                        msg: "Followed."
                    })
                }
            }
        } else {
            res.status(404).json({
                succeded: false,
                msg: "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded:false,
            msg: error.message
        })
    }
}


const changeProfilePhoto = async (req,res)=>{
    try {
        if(req.files.image.tempFilePath) {
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    use_filename: true,
                    folder: "celikstagram"
                }
            )
            if(result) {
                const updateUser = await User.update({profile_photo: result.secure_url}, {where:{id:res.locals.user.id}})
                if(updateUser) {
                    const user = await User.findOne({where: {id: res.locals.user.id}})
                    if(user) {
                        user.followers = JSON.parse(user.followers)
                        user.following = JSON.parse(user.following)
                        res.status(200).json({
                            succeded: true,
                            user: user,
                            msg: "Profile photo changed."
                        })
                    }
                } else {
                    res.status(422).json({
                        succeded: false,
                        msg: "Profile picture could not be updated."
                    })
                }
            } else {
                res.status(422).json({
                    succeded: false,
                    msg: "Photo not uploaded."
                })
            }
        } else {
            res.status(403).json({
                succeded: false,
                msg: "Image required."
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
    followUser,
    changeProfilePhoto
}