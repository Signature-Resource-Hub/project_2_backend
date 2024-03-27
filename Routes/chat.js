var express = require('express'),
routes = express.Router();
const chatController = require('../Controller/chat'); 

routes.post('/chat', chatController.chat);
routes.post('/viewchat', chatController.getchat);

module.exports = routes;