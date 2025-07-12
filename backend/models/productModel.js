const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    imagePublicId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPercent: {
        type: Number,
        default: 0,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
},{timestamps: true});

module.exports = mongoose.model('Product', productSchema);