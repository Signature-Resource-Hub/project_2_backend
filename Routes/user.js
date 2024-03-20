var express = require('express'),
routes = express.Router();
var userController = require('../Controller/user');
routes.post('/verify', userController.verifyUser);
routes.post('/otp', userController.verifyotp);
routes.post('/register', userController.registerUser);
routes.post('/completeprofile', userController.completeprofile);
module.exports = routes;