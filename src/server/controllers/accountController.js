const User = require("../models").users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req,res)=>{
    try {
        const {name, username, email, password} = req.body
        if(name && username && email && password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            if(hashedPassword) {
                const create = await User.create({name,username,email, password:hashedPassword})
                if(create) {
                    res.status(200).json({
                        succeded:true,
                        msg: "Account created!!!"
                    })
                } else {
                    res.status(401).json({
                        succeded: false,
                        msg: "Account couldn't be created. "
                    })
                }
            } else {
                res.status(404).json({
                    succeded: false,
                    msg: "something going wrong!"
                })
            }
        } else {
            res.status(403).json({
                succeded: false,
                msg: "Informations required!"
            })
        }

    } catch (error) {
        if(error.errors[0].validatorKey === "not_unique") {
            res.status(403).json({
                succeded:false,
                msg: `This ${error.errors[0].path} already taken.` 
            })
        } else {
            res.status(500).json({
                succeded:false,
                msg: error.message
            })
        }
    }
}

const loginUser = async (req,res) =>{
    try {
        const {username,password} = req.body
        if(username && password) {
            const checkUsername = await User.findOne({where:{username:username}})
            if(checkUsername) {
                const comparePassword = await bcrypt.compare(password,checkUsername.password)
                if(comparePassword) {
                    const token = await jwt.sign({id: checkUsername.id},process.env.JWT_PASSWORD,{expiresIn:"14d"})
                    res.cookie("token",token,{httpOnly: true, maxAge: 1000*60*60*24*14})
                    res.status(200).json({
                        succeded:true,
                        msg: "You are logged in!"
                    })
                } else {
                    res.status(401).json({
                        succeded: false,
                        msg: "Account not found."
                    })
                }
            } else {
                res.status(401).json({
                    succeded: false,
                    msg: "Account not found."
                })
            }
        } else {
            res.status(403).json({
                succeded: false,
                msg: "Informations Required!"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            succeded:false,
            msg: error.message
        })
    }
}

const diffrentUserProfile = async (req,res)=>{
    try {
        const username = req.body.username.trim()
        if(username) {
            if(username === res.locals.user.username) {
                res.status(200).json({
                    succeded:true,
                    sameAccount: true,
                    msg: "Same account."
                })
            } else {
                const user = await User.findOne({where: {username: username}})
                const {following, followers } = user
                user.following = JSON.parse(following)
                user.followers = JSON.parse(followers)
                if(user) {
                    res.status(200).json({
                        succeded: true,
                        user: {
                            id: user.id,
                            username: user.username,
                            name: user.name,
                            adress: user.adress,
                            bio: user.bio,
                            profile_photo: user.profile_photo,
                            following: user.following,
                            followers: user.followers,
                            
                        },
                        msg: "User finded and sended."
                    })
                } else {
                    res.status(404).json({
                        succeded: false,
                        message: "User not exist."
                    })
                }
            }
        } else {
            res.status(403).json({
                succeded: false,
                msg: "Username information required."
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded:false,
            msg: error.message
        })
    }
}


const updateUser = async (req,res)=>{
    try {
        const {name, email, username, adress, bio} = req.body
        if(username === res.locals.user.username) {
            const updateUser = await User.update(
                {...req.body},
                {where:{id: res.locals.user.id}}
            )
            if(updateUser) {
                res.status(200).json({
                    succeded:true,
                    msg: "Account updated."
                })
            } else {
                res.status(401).json({
                    succeded:false,
                    msg: "Account update failed."
                })
            }
        } else if(username !== res.locals.user.username) {
            const checkUsername = await User.findAll({where:{username: username}})
            if(checkUsername.username) {
                res.status(200).json({
                    succeded: false,
                    msg: "Username already taken. Please enter diffrent username."
                })
            } else {
                const updateUser = await User.update(
                    {...req.body},
                    {where:{id: res.locals.user.id}}
                )
                if(updateUser) {
                    res.status(200).json({
                        succeded: true,
                        msg: "User updated."
                    })
                } else {
                    res.status(401).json({
                        succeded: false,
                        msg: "Account update failed."
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            succeded:false,
            msg: error.message
        })
    }
}






const logout =async (req,res)=>{
    try {
        await res.cookie("token", "", {
            maxAge: 1
        });
        res.status(200).json({
            succeded: true,
            msg: "logged out"
        })
    } catch (error) {
        res.status(500).json({
            succeded:false,
            msg: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    diffrentUserProfile,
    updateUser,
    logout
    
}