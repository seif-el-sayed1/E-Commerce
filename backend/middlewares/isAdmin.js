const userModel = require('../models/userModel');
const isAdmin = async (req, res, next) => {
    const user = await userModel.findById(req.user.id);
    if (user && user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ success: false, message: "Access denied" });
    }
};

module.exports = isAdmin;