const express = require("express");
const router = express.Router();

const wishlistController = require("../controllers/wishlistController");
const verifyToken = require('../middlewares/verifyToken')

// add to wishlist
router.route('/add-to-wishlist').post(verifyToken, wishlistController.addToWishList)
// delete from wishlist
router.route('/delete-from-wishlist').post(verifyToken, wishlistController.deleteFromWishList)
// get wishlist
router.route('/get-wishlist').get(verifyToken, wishlistController.getWishList)

module.exports = router
