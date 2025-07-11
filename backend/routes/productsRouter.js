const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
const upload = require('../middlewares/uploadImage')

//add product
router.route('/add-product').post(upload.single('image'), productController.addProduct)
// update product
router.route('/update-product/:id').put(upload.single('image'), productController.updateProduct)
// delete product
router.route('/delete-product/:id').delete(productController.deleteProduct)
// get all products
router.route('/get-all-products').get(productController.getAllProducts)
// get product
router.route('/get-product/:id').get(productController.getProductById)

module.exports = router