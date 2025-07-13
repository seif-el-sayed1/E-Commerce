const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    products: [
        {
            productDetails: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: Number,
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true  
    },
    phone: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["pending", "delivered", "shipped", "out-for-delivery", "cancelled"],
        default: "pending"
    },
    date: {
        type: Date,
        default: new Date().toLocaleString(),
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "online"],
        default: "cod"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    isPaid: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);