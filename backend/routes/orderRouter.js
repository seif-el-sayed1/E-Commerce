const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController')
const verifyToken = require('../middlewares/verifyToken')

// submit order
router.route('/submit-order').post(verifyToken, orderController.submitOrder)
// cancel order
router.route('/cancel-order').post(verifyToken, orderController.cancelOrder)
// get user orders
router.route('/get-user-orders').get(verifyToken, orderController.getUserOrders)

module.exports = router