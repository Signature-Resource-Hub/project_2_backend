require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//import route
var chatRoutes=require('./Routes/chat')
var userUpdateRoutes=require('./Routes/user-router')
var userRoutes=require('./Routes/user-router')
//DB Connection
mongoose
.connect(process.env.DATABASE, {})
.then(() => {
console.log("DB CONNECTED");
});


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//after middleware
app.use('/api',userRoutes);
app.use('/api',chatRoutes);
app.use('/api',userUpdateRoutes);

//PORT
const port = process.env.PORT || 8000;
//Starting a server
app.listen(port, () => {
console.log(`app is running at ${port}`);
});
