var express = require('express'),
routes = express.Router();
var quizController = require('../Controller/quiz');
routes.post('/addquestion', quizController.addquestion);
routes.post('/quiz', quizController.attendquiz);
module.exports = routes;