const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')
const verifyToken = require('../middlewares/verifyToken')

// add to cart
router.route('/add-to-cart').post(verifyToken, cartController.addToCart)
// increase from cart
router.route('/increase-quantity').post(verifyToken, cartController.increaseQuantity)
// decrease from cart
router.route('/decrease-quantity').post(verifyToken, cartController.decreaseQuantity)
//delete from cart
router.route('/delete-from-cart').post(verifyToken, cartController.deleteFromCart)
// delete cart
router.route('/delete-cart').delete(verifyToken, cartController.deleteCart)
// get cart
router.route('/get-cart').get(verifyToken, cartController.getCart)

module.exports = router