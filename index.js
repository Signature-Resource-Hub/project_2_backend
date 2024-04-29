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
var userRoutes=require('./Routes/user')
var gameRoutes=require('./Routes/game')
var tempcoderoutes=require('./Routes/tempcode_route')
var connection=require('./Routes/connection')
//DB Connection
mongoose
.connect(process.env.DATABASE, {})
.then(() => {
console.log("DB CONNECTED");
});
//import route
var userRoutes = require('./Routes/user');
var quizRoutes = require('./Routes/quiz');


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//after middleware
app.use('/api',userRoutes);
app.use('/api',quizRoutes);
app.use('/api',chatRoutes);
app.use('/api',userUpdateRoutes);
app.use('/api',gameRoutes);
app.use('/api',tempcoderoutes);
app.use('/api',connection);

//PORT
const port = process.env.PORT || 8000;
//Starting a server
app.listen(port, () => {
console.log(`app is running at ${port}`);
});
