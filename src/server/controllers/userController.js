const User = require("../models").users

const followUser = async (req,res)=>{
    try {
        const { follow } = req.body
        const loggedUser = res.locals.user 
        const user = await User.findOne({where:{id: req.params.id}}) // who is follow / unfollow 
        let  followers = JSON.parse(user.followers)
        let {following} = loggedUser // user

        if(follow) {
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
    } catch (error) {
        res.status(500).json({
            succeded:false,
            msg: error.message
        })
    }
}

module.exports = {
    followUser
}