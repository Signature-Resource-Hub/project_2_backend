var express = require('express')
routes = express.Router()
var gamecontroller = require('../Controller/game')

routes.post('/playgame',gamecontroller.game)
routes.post('/gameresult',gamecontroller.getchoice)

module.exports = routes