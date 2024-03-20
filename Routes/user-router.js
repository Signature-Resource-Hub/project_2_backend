var express = require('express'),
routes = express.Router();
var userController = require('../Controller/user-update'); 

routes.post('/updateemail', userController.updateEmail);
routes.post('/updateprofile', userController.updateprofile);
module.exports = routes;
