const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true,
        default: ''
    },
    imagePublicId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['seller', 'user'],
        require: true,
        default: 'user'
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }, 
    signUpWay: {
        type: String,
        enum: ['google', 'email'],
        default: 'email'
    },
    verifyOtp: {
        type: Number,
        default: ''
    },
    verifyOtpExpired: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: Number,
        default: ''
    },
    resetOtpExpired: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)