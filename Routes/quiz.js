var express = require('express'),
routes = express.Router();
var quizController = require('../Controller/quiz');
routes.post('/addquestion', quizController.addquestion);
routes.post('/quiz', quizController.attendquiz);
routes.get('/getquestion', quizController.getQuestion);
module.exports = routes;