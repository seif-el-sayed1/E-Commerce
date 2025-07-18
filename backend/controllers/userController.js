const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const transporter = require("../config/nodemailer")
const users = require("../models/userModel")
const {EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE} = require("../config/emailTemplates")
const cloudinary = require('cloudinary').v2;

const register = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const existUser = await users.findOne({email: email})        
        const usedName = await users.findOne({name: name})        
        if(!name || !email || !password) {
            return res.status(400).json({success: false, message: "Name,Email and Password are Required"})
        }

        if(existUser) {
            return res.status(409).json({success: false, message: "User Already Exist"})
        }
        if(usedName) {
            return res.status(409).json({success: false, message: "Name Already Used"})
        }
        if(!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Invalid email"})
        }
        if(!validator.isStrongPassword(password)) {
            return res.status(400).json({success: false, message: "Please Enter Strong Password"})
        }

        const response = await cloudinary.uploader.upload(req.file.path, {
            folder: "users",
            transformation: [{ width: 300, height: 300  , crop: "limit" }]
        });

        const image = response.secure_url

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new users({
            image,
            imagePublicId: response.public_id,
            name,
            email, 
            password: hashPassword,
            signUpWay: "email"
        })
        await user.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '10m'})
        res.cookie('token', token, {maxAge:600000, httpOnly:true, secure:true, sameSite:"none"})

        return res.status(201).json({success: true, token})
    } catch(error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await users.findOne({email})
        if(!user) {
            return res.status(404).json({success: false, message: "Email not Found"})
        }

        const truePassword = await bcrypt.compare(password, user.password)
        if(!truePassword) {
            return res.status(401).json({success: false, message: "Email or Password is Incorrect"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '10m'})
        res.cookie('token', token, {maxAge:600000, httpOnly:true, secure:true, sameSite:"none"})

        return res.status(200).json({success: true, user: {email: user.email, role: user.role}, token})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {httpOnly:true, secure:true, sameSite:"none"})
        return res.status(200).json({success: true})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const sendVerifyOtp = async (req, res) => {
    try {
        const user = await users.findById(req.user.id)
        if(user.isVerified) {
            return res.status(400).json({success: false, message: "Email Already Verified"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp
        user.verifyOtpExpired = Date.now() + 24 * 60 * 60 * 1000      
        await user.save()

        const mailOption = {
            from: process.env.EMAIL_SENDER,
            to: user.email, 
            subject: "Verify Your Email",
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOption)

        return res.status(200).json({success: true, message: "Verification Otp Sent , Check Your Email"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const verifyEmail = async(req, res) => {
    const {otp} = req.body
    try {
        const user = await users.findById(req.user.id)
        if(!otp) {
            return res.status(400).json({success: false, message: "Please Enter The Otp"})
        }
        if(user.verifyOtp != otp || user.verifyOtpExpired < Date.now()) {
            return res.status(400).json({success: false, message: "Invalid Otp"})
        }

        user.isVerified = true
        user.verifyOtp = ''
        user.verifyOtpExpired = 0
        await user.save()
        return res.status(200).json({success: true, message: "Verified Email Successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const sendResetOtp = async (req, res) => {
    const {email} = req.body
    try {
        const user = await users.findOne({email})
        if(!user) {
            return res.status(404).json({success: false, message: "Email not Found"})
        }
        if (user.signUpWay != "email") {
            return res.status(400).json({success: false, message: "You Signed Up Using Google, You Can't Reset Your Password"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp
        user.resetOtpExpired = Date.now() + 24 * 60 * 60 * 1000      
        await user.save()

        const mailOption = {
            from: process.env.EMAIL_SENDER,
            to: email, 
            subject: "Reset Your Password",
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOption)

        return res.status(200).json({success: true, message: "Reset Otp sent , Check Your Email"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body
    try {
        const user = await users.findOne({email})
        if(!otp || !newPassword) {
            return res.status(400).json({success: false, message: "Otp and New Password are Required"})
        }
        if(user.resetOtp != otp || user.resetOtpExpired < Date.now()) {
            return res.status(400).json({success: false, message: "Invalid Otp"})
        }
        const hashNewPassword = await bcrypt.hash(newPassword, 10)
        const samePassword = await bcrypt.compare(newPassword, user.password)
        if(samePassword) {
            return res.status(400).json({success: false, message: 'The Password Is already Used'})
        }
        user.password = hashNewPassword
        user.resetOtp = ""
        user.resetOtpExpired = 0    
        await user.save()

        return res.status(200).json({success: true, message: "Reset Password Successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const updateUser = async (req, res) => {
    const {newName, oldPassword, newPassword} = req.body
    try {
        const user = await users.findById(req.user.id)

        if(req.file) {
            if (user.imagePublicId) {
                await cloudinary.uploader.destroy(user.imagePublicId);
            }

            const response = await cloudinary.uploader.upload(req.file.path);
            const image = response.secure_url;
            user.image = image
            user.imagePublicId = response.public_id;
        }

        if (newName && newName !== user.name) {
            const existingUser = await users.findOne({ name: newName });
            if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                return res.status(400).json({ success: false, message: "Name is already in use" });
            }
            user.name = newName;
        }

        if (oldPassword && newPassword) {
            const samePassword = await bcrypt.compare(oldPassword, user.password)
            if (samePassword) {
                if (!validator.isStrongPassword(newPassword)) {
                    return res.status(400).json({success: false, message: "Please Enter Strong Password"})
                }

                const isSameAsOld = await bcrypt.compare(newPassword, user.password);
                if (isSameAsOld) {
                    return res.status(400).json({success: false, message: "New password must be different from old one"})
                }
                if (user.signUpWay != "email") {
                    return res.status(400).json({success: false, message: "You Signed Up Using Google, You Can't Reset Your Password"})
                }
                user.password = await bcrypt.hash(newPassword, 10) 
            } else {
                return res.status(401).json({success: false, message: "Incorrect Password"})
            }            
        } else if (oldPassword && !newPassword) {
            return res.status(400).json({success: false, message: "New Password is Required"})
        } else if (!oldPassword && newPassword) {
            return res.status(400).json({success: false, message: "Old Password is Required"})
        }

        await user.save()

        return res.status(200).json({success: true, message: "Data Updated Successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const userData = async (req, res) => {
    try {
        const user = await users.findById(req.user.id).select("-password -verifyOtp -verifyOtpExpired -resetOtp -resetOtpExpired -signUpWay -__v -createdAt -updatedAt")
        if(!user) {
            return res.status(404).json({success: false, message: "User not found"})
        }

        return res.status(200).json({success: true, userData: user})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({success: true})
    } catch(error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const getAllUsers = async (req, res) => {
    try {
        if(req.user.role !== "admin") {
            return res.status(401).json({success: false, message: "Unauthorized"})
        }
        const {page = 1, limit = 5} = req.query

        
        const skip = (Number(page) - 1) * Number(limit);

        const allUsers = await users.find({role: "user"})
                                    .skip(skip)
                                    .limit(Number(limit))
                                    .select("-password -isVerified -verifyOtp -verifyOtpExpired -resetOtp -resetOtpExpired -signUpWay -__v -createdAt -updatedAt")
                                    .sort({createdAt: -1})

        const totalUsers = await users.countDocuments({role: "user"})
        const totalPages = Math.ceil(totalUsers / Number(limit));
        
        return res.status(200).json({success: true, allUsers, totalUsers, totalPages })
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {
    register,
    login,
    logout, 
    sendVerifyOtp,
    verifyEmail,
    sendResetOtp,
    resetPassword,
    userData,
    isAuthenticated,
    updateUser,
    getAllUsers
}
