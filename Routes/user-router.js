var express = require('express'),
routes = express.Router();
var userController = require('../Controller/user-update'); 
//const userController = require('../controllers/userController');

routes.post('/updateemail', userController.updateEmail);
routes.post('/updateprofile', userController.updateprofile);
routes.post('/getuser',userController.getUser);
routes.post('/getprofile',userController.getprofile);


module.exports = routes;