var express = require('express'),
routes = express.Router();
const connectController = require('../Controller/connect_partner'); 

routes.post('/connect', connectController.connectUserAndPartner);
routes.post('/partnerdetails', connectController.getconnectdetails);

module.exports = routes;