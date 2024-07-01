var express = require('express')
routes = express.Router()
var paymentcontroller = require('../Controller/payments')

routes.post('/payment',paymentcontroller.payments)
routes.post('/getpaymentdetails',paymentcontroller.paymentsdetails)

module.exports = routes