const jwt = require("jsonwebtoken")
const User = require("../models").users

const checkUser = async (req, res, next) => {
try {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_PASSWORD, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        const user = await User.findOne({where:{id:decodedToken.id}});
        if(user) {
          res.locals.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            adress: user.adress,
            bio: user.bio,
            following: JSON.parse(user.following),
            followers: JSON.parse(user.followers),
            profile_photo: user.profile_photo
          };
          next();
        } else {
          try {
              await res.cookie("token", "", {
                  maxAge: 1
              });
              res.redirect("/")
          } catch (error) {
              res.status(500).json({
                  succeded:false,
                  msg: error.message
              })
          }
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
} catch (error) {
  res.cookie("token", "", {
    maxAge: 1
  });
  res.redirect("/")
}
};

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      jwt.verify(token, process.env.JWT_PASSWORD, (err) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login');
        } else {
          next();
        }
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.status(401).json({
      succeeded: false,
      error: 'Not authorized',
    });
  }
};

const reverseAuthenticateToken = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
    
        if (token) {
          jwt.verify(token, process.env.JWT_PASSWORD, (err) => {
            if (err) {
              console.log(err.message);
              next()
            } else {
              res.redirect("/")
            }
          });
        } else {
          next()
        }
      } catch (error) {
        next()
      }
}

module.exports= { authenticateToken, checkUser , reverseAuthenticateToken };