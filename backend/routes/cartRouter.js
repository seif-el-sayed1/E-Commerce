const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')
const verifyToken = require('../middlewares/verifyToken')
const isUser = require('../middlewares/isUser')

// add to cart
router.route('/add-to-cart').post(verifyToken, isUser, cartController.addToCart)
// increase from cart
router.route('/increase-quantity').post(verifyToken, isUser, cartController.increaseQuantity)
// decrease from cart
router.route('/decrease-quantity').post(verifyToken, isUser, cartController.decreaseQuantity)
//delete from cart
router.route('/delete-from-cart').post(verifyToken, isUser, cartController.deleteFromCart)
// delete cart
router.route('/delete-cart').delete(verifyToken, isUser, cartController.deleteCart)
// get cart
router.route('/get-cart').get(verifyToken, isUser, cartController.getCart)

module.exports = router