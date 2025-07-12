const wishlistModel = require("../models/wishListModel")

const addToWishList = async (req, res) => {
    const {productId} = req.body
    try {
        const wishList = await wishlistModel.findOne({userId: req.user.id})
        if (!wishList) {
            newWish = await wishlistModel.create({
                userId: req.user.id,
                products: [{
                    productId
                }]
            })
            return res.status(201).json({success: true, message: "Wishlist created and product added"})
        } else {
            const product = wishList.products.find(p => p.productId.toString() === productId.toString())
            if (product) {
                return res.status(400).json({success: false, message: "Product already exists in wishlist"})
            } else {
                wishList.products.push({productId})
                await wishList.save()
                return res.status(201).json({success: true, message: "Product added to wishlist successfully"})
            }
        }
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

const deleteFromWishList = async (req, res) => {
    const {productId} = req.body
    try {
        const wishList = await wishlistModel.findOne({userId: req.user.id})
        if (!wishList) {
            return res.status(404).json({success: false, message: "Wishlist not found"})
        }
        const productIndex = wishList.products.findIndex(p => p.productId.toString() === productId)
        if (productIndex === -1) {
            return res.status(404).json({success: false, message: "Product not found in wishlist"})
        }
        wishList.products.splice(productIndex, 1)
        await wishList.save()
        return res.status(200).json({success: true, message: "Product removed from wishlist successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const getWishList = async (req, res) => {
    try {
        const wishList = await wishlistModel.findOne({userId: req.user.id})
                                .select("-__v -updatedAt -createdAt")
                                .populate({
                                    path: "products.productId",
                                    select: "-__v -createdAt -updatedAt -category -stock -imagePublicId"
                                });
        if (!wishList) {
            return res.status(404).json({success: false, wishList:{products: []}})
        }
        return res.status(200).json({success: true, wishList})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {
    addToWishList, 
    deleteFromWishList, 
    getWishList
}