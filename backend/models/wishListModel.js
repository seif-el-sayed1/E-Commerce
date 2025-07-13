const mongoose = require("mongoose");

const wishListModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }]
},{timestamps: true});

module.exports = mongoose.model("Wishlist", wishListModel);