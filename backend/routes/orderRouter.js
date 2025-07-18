const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController')
const verifyToken = require('../middlewares/verifyToken')
const isUser = require('../middlewares/isUser')
const isAdmin = require('../middlewares/isAdmin')

// submit order
router.route('/submit-order').post(verifyToken, isUser, orderController.submitOrder)
// cancel order
router.route('/cancel-order').post(verifyToken, isUser, orderController.cancelOrder)
// get user orders
router.route('/get-user-orders').get(verifyToken, isUser, orderController.getUserOrders)
// get all orders
router.route('/get-all-orders').get(verifyToken, isAdmin, orderController.getAllOrders)

module.exports = router