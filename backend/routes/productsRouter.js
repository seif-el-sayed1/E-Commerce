const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
const upload = require('../middlewares/uploadImage')
const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin')
//add product
router.route('/add-product').post(verifyToken, isAdmin, upload.single('image'), productController.addProduct)
// update product
router.route('/update-product/:id').put( verifyToken, isAdmin, upload.single('image'), productController.updateProduct)
// delete product
router.route('/delete-product').delete( verifyToken, isAdmin, productController.deleteProduct)
// get all products
router.route('/get-all-products').get(productController.getAllProducts)
// get product
router.route('/get-product/:id').get(productController.getProductById)

module.exports = router