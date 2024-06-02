var express = require('express'),
routes = express.Router();
var quizController = require('../Controller/quiz');
routes.post('/addquestion', quizController.addquestion);
routes.post('/quiz', quizController.attendquiz);
routes.post('/getquestion', quizController.getQuestion);
routes.get('/gettopics', quizController.gettopics);
routes.post('/addstatus', quizController.addstatus);
routes.post('/checkstatus', quizController.checkQuizStatus);
routes.post('/checkpartnerstatus', quizController.checkpartnerQuizStatus);
module.exports = routes;