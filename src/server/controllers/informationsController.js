
const getUserInformations = async (req,res)=>{
    try {
        if(req.cookies.token) {
            res.status(200).json({
                succeded: true,
                user: res.locals.user
            })
        } else {
            res.status(200).json({
                succeded:true,
                user: false
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
    getUserInformations
}