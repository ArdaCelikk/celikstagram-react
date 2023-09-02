const User = require("../models").users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req,res)=>{
    try {
        const {name, username, email, password} = req.body
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
        const checkUsername = await User.findOne({username})
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
        
    } catch (error) {
        res.status(500).json({
            succeded:false,
            msg: error.message
        })
    }
}


module.exports = {
    registerUser,
    loginUser
}