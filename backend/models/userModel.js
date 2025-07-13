const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true,
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
        enum: ['admin', 'user'],
        require: true,
        default: 'user'
    },
    email: {
        type: String,
        required: true,
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
        default: null
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
        default: null
    },
    resetOtpExpired: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)