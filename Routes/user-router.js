var express = require('express'),
routes = express.Router();
var userController = require('../Controller/user-update'); 
//const userController = require('../controllers/userController');

routes.post('/updateemail', userController.updateEmail);
routes.post('/updateprofile', userController.updateprofile);
routes.post('/getuser',userController.getUser);
routes.post('/getprofile',userController.getprofile);
routes.post('/updatenum',userController.updateContactNumber);
routes.post('/newnumotp',userController.verifyContactOtp);
routes.post('/updateemail',userController.updateEmail);
routes.post('/newemailotp',userController.verifyEmailOtp);
routes.post('/newname',userController.updateName);
routes.post('/newdob',userController.updateDob);

module.exports = routes;