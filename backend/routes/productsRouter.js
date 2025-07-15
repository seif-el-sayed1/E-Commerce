const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
const upload = require('../middlewares/uploadImage')
const verifyToken = require('../middlewares/verifyToken')
//add product
router.route('/add-product').post(verifyToken, upload.single('image'), productController.addProduct)
// update product
router.route('/update-product/:id').put( verifyToken, upload.single('image'), productController.updateProduct)
// delete product
router.route('/delete-product/:id').delete( verifyToken, productController.deleteProduct)
// get all products
router.route('/get-all-products').get(productController.getAllProducts)
// get product
router.route('/get-product/:id').get(productController.getProductById)

module.exports = router