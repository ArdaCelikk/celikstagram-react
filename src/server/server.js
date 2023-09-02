const cookieParser = require("cookie-parser");
const express = require("express");
const accountRouter = require("./routers/accountRouter")
const informationsRouter = require("./routers/informationsRouter")
require("dotenv").config()

const app = express();
// CONFİGURE SERVER
const port = process.env.PORT
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());


// ROUTES
app.use("/account", accountRouter)
app.use("/informations", informationsRouter)


app.listen(port,()=>{
    console.log("Server Started On This Port: "+ port);
})

