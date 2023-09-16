const cookieParser = require("cookie-parser");
const express = require("express");
const accountRouter = require("./routers/accountRouter")
const informationsRouter = require("./routers/informationsRouter")
const userRouter = require("./routers/userRouter")
const postsRouter = require("./routers/postsRouter")
const cloudinary = require('cloudinary').v2
const fileUpload = require("express-fileupload");
require("dotenv").config()





          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY , 
  api_secret:  process.env.CLOUDINARY_API_SECRET
});


const app = express();
// CONFİGURE SERVER
const port = process.env.PROXY_PORT
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}))


// ROUTES
app.use("/account", accountRouter)
app.use("/informations", informationsRouter)
app.use("/user", userRouter)
app.use("/post", postsRouter)


app.listen(port,()=>{
    console.log("Server Started On This Port: "+ port);
})

