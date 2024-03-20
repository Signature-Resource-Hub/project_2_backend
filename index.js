require("dotenv").config();
const mongoose = require("mongoose"); 
const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 
const cors = require("cors");
var userRoutes = require('./Routes/user-router');
//DB Connection mongoose
mongoose.connect(process.env.DATABASE, {}) .then(() => {
console.log("DB CONNECTED"); });
//Middlewares 
app.use(bodyParser.json()); 
app.use(cookieParser()); 
app.use(cors());
app.use('/api',userRoutes);

//PORT
const port = process.env.PORT || 8000; //Starting a server
app.listen(port, () => {
console.log(`app is running at ${port}`);
 });