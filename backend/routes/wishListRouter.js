const express = require("express");
const router = express.Router();

const wishlistController = require("../controllers/wishlistController");
const verifyToken = require('../middlewares/verifyToken')
const isUser = require('../middlewares/isUser');

// add to wishlist
router.route('/add-to-wishlist').post(verifyToken, isUser, wishlistController.addToWishList)
// delete from wishlist
router.route('/delete-from-wishlist').post(verifyToken, isUser, wishlistController.deleteFromWishList)
// get wishlist
router.route('/get-wishlist').get(verifyToken, isUser, wishlistController.getWishList)

module.exports = router
