require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//import route
var userRoutes = require('./Routes/user');
var userUpdateRoutes=require('./Routes/user-router')
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
app.use('/api',userUpdateRoutes);

//PORT
const port = process.env.PORT || 8000;
//Starting a server
app.listen(port, () => {
console.log(`app is running at ${port}`);
});
